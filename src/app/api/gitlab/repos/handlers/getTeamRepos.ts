import { NextSupabaseClient } from '@/shared/api/supabase/next';
import { Database } from '@/shared/api/supabase/types';

interface GetTeamReposParams {
  supabaseClient: NextSupabaseClient;
  teamId: string;
}

type Result<T, E> = Success<T> | Error<E>;

interface Success<T> {
  success: true;
  data: T;
}

interface Error<E> {
  success: false;
  error: E;
}

type Data = Pick<Database['public']['Tables']['gitlab_repos']['Row'], 'url'>[];

export const getTeamRepos = async ({
  supabaseClient,
  teamId,
}: GetTeamReposParams): Promise<Result<Data, string>> => {
  const { data, error } = await supabaseClient
    .from('gitlab_repos')
    .select('url')
    .eq('team_id', teamId);

  if (error) {
    return { error: error.message, success: false };
  }

  return { data, success: true };
};
