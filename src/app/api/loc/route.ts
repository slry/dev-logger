import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/shared/api/supabase/next';
import { validateToken } from '@/shared/api/validate-token';
import { parseBody } from '@/shared/lib/parseBody';

import { addDeveloperFileOperations } from './handlers/addDeveloperFileOperations';
import { addDeveloperLocPerDay } from './handlers/addDeveloperLocPerDay';
import { addDeveloperTotalLoc } from './handlers/addDeveloperTotalLoc';
import { bodySchema } from './model';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json('Missing token', { status: 400 });
  }

  const { data: tokenData, error } = await validateToken(token);

  if (error || !tokenData) {
    return NextResponse.json(error, { status: 400 });
  }

  const { user_id: userId, team_id: teamId } = tokenData;

  const { data: body, error: bodyError } = await parseBody(req, bodySchema);

  if (bodyError || !body) {
    return NextResponse.json(bodyError, { status: 400 });
  }

  const supabase = await createClient();

  await addDeveloperTotalLoc({
    supabaseClient: supabase,
    changes: body.changes,
    repoUrl: body.repoUrl,
    userId,
    teamId,
  });

  await addDeveloperLocPerDay({
    supabaseClient: supabase,
    changes: body.changes,
    timestamp: body.timestamp,
    repoUrl: body.repoUrl,
    userId,
    teamId,
  });

  await addDeveloperFileOperations({
    supabaseClient: supabase,
    changes: body.changes,
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
}
