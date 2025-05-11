import { NextResponse } from 'next/server';

import { createClient } from '@/shared/api/supabase/next';
import { withTokenValidationQuery } from '@/shared/api/with-token-validation-query';

import { getTeamRepos } from './handlers/getTeamRepos';

export const GET = withTokenValidationQuery({
  handler: async ({ teamId }) => {
    const supabase = await createClient();

    const res = await getTeamRepos({
      supabaseClient: supabase,
      teamId,
    });

    if (!res.success) {
      return NextResponse.json(res.error, { status: 400 });
    }

    return NextResponse.json(
      {
        success: true,
        data: res.data.map(({ url }) => url),
      },
      { status: 200 },
    );
  },
});
