import { NextSupabaseClient } from '@/shared/api/supabase/next';

interface GetTeamReposParams {
  supabaseClient: NextSupabaseClient;
  teamId: string;
}

export const getTeamRepos = async ({ supabaseClient, teamId }: GetTeamReposParams) => {
  const { data, error } = await supabaseClient
    .from('gitlab_repos')
    .select('url')
    .eq('team_id', teamId);

  if (error) {
    throw new Error(`Error fetching team repos: ${error.message}`);
  }

  return data;
};
