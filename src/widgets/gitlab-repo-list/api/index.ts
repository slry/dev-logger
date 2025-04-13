'use server';

import { getUserId } from '@/shared/api/get-user-id';
import { getGitlabToken } from '@/shared/api/gitlab/get-gitlab-token';
import { createGitlabClient } from '@/shared/api/gitlab/server';
import { createClient } from '@/shared/api/supabase/next';

import { gitlabRepoSchema } from '../model';

export const getOwnerRepos = async () => {
  const userId = await getUserId();

  const gitlabToken = await getGitlabToken(userId);

  if (!gitlabToken) {
    console.error('Gitlab token not found');
    return [];
  }

  const gitlabClient = createGitlabClient(gitlabToken);

  const projects = await gitlabClient.Projects.all();

  console.log('projects', projects);

  return projects;
};

export const getTeamGitlabRepos = async (teamId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('gitlab_repos')
    .select('*')
    .eq('team_id', teamId)
    .single();

  if (error) {
    console.error(error);
    return [];
  }

  return gitlabRepoSchema.array().parse(data);
};
