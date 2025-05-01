'use server';
import { getUserId } from '@/shared/api/get-user-id';
import { getGitlabToken } from '@/shared/api/gitlab/get-gitlab-token';
import { createGitlabClient } from '@/shared/api/gitlab/server';
import { isUserTeamOwner } from '@/shared/api/is-user-team-owner';
import { createClient } from '@/shared/api/supabase/server';

import { gitlabRepoSchemaTransformer, GitlabRepoTransformed } from '../model';

export const getRepos = async (teamId: string) => {
  const userId = await getUserId();

  const gitlabToken = await getGitlabToken(userId);

  if (!gitlabToken) {
    console.error('Gitlab token not found');
    return [];
  }

  const gitlabClient = createGitlabClient(gitlabToken);

  const projects = await gitlabClient.Projects.all();

  return gitlabRepoSchemaTransformer(teamId).array().parse(projects);
};

export const addRepoToTeam = async (teamId: string, repo: GitlabRepoTransformed) => {
  const userId = await getUserId();

  const isTeamOwner = await isUserTeamOwner(teamId, userId);

  if (!isTeamOwner) {
    throw new Error('User is not team owner');
  }

  const supabase = await createClient();

  const { error } = await supabase.from('gitlab_repos').insert({
    team_id: teamId,
    url: repo.url,
    name: repo.name,
    description: repo.description ?? '',
  });

  if (error) {
    console.error('Error adding GitLab repo to team:', error);
    throw new Error('Error adding GitLab repo to team');
  }
};
