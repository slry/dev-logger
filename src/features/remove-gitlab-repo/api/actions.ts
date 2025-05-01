'use server';

import { getUserId } from '@/shared/api/get-user-id';
import { isUserTeamOwner } from '@/shared/api/is-user-team-owner';
import { createClient } from '@/shared/api/supabase/server';

export const removeGitlabRepo = async (teamId: string, repoUrl: string) => {
  const userId = await getUserId();
  const isTeamOwner = await isUserTeamOwner(teamId, userId);

  if (!isTeamOwner) {
    throw new Error('User is not team owner');
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('gitlab_repos')
    .delete()
    .eq('team_id', teamId)
    .eq('url', repoUrl);

  if (error) {
    throw new Error(`Error removing GitLab repo: ${error.message}`);
  }

  return true;
};
