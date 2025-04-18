import { NextResponse } from 'next/server';

import { createClient } from '@/shared/api/supabase/next';
import { withTokenValidationQuery } from '@/shared/api/with-token-validation-query';

import { addDeveloperTimeSpentPerDay } from './handler/addDeveloperTimeSpentPerDay';
import { bodySchema } from './model';

export const POST = withTokenValidationQuery({
  handler: async ({ userId, teamId, body }) => {
    const supabase = await createClient();

    await addDeveloperTimeSpentPerDay({
      supabaseClient: supabase,
      time: body.time,
      timestamp: body.timestamp,
      repoUrl: body.repoUrl,
      userId,
      teamId,
    });

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  },
  bodySchema: bodySchema,
});
