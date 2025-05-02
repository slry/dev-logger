'use server';

import { createClient } from '@/shared/api/supabase/next';

import { gitlabRepoSchema } from '../model';

export const getTeamGitlabRepos = async (teamId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('gitlab_repos')
    .select('*')
    .eq('team_id', teamId);

  if (error) {
    console.error(error);
    return [];
  }

  return gitlabRepoSchema.array().parse(data);
};
