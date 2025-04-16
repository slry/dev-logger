import { NextResponse } from 'next/server';

import { createClient } from '@/shared/api/supabase/next';
import { withTokenValidationQuery } from '@/shared/api/with-token-validation-query';

import { getTeamRepos } from './handlers/getTeamRepos';

export const GET = withTokenValidationQuery({
  handler: async ({ teamId }) => {
    const supabase = await createClient();

    const reposUrls = await getTeamRepos({
      supabaseClient: supabase,
      teamId,
    });

    return NextResponse.json(
      {
        success: true,
        data: reposUrls.map(({ url }) => url),
      },
      { status: 200 },
    );
  },
});
