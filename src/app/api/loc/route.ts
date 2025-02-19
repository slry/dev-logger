import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/shared/api/supabase/next';
import { validateToken } from '@/shared/api/validate-token';
import { parseBody } from '@/shared/lib/parseBody';

import { addDeveloperTotalLoc } from './addDeveloperTotalLoc';
import { bodySchema } from './model';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json('Missing token', { status: 400 });
  }

  const { data: userId, error } = await validateToken(token);

  if (error || !userId) {
    return NextResponse.json(error, { status: 400 });
  }

  const { data: body, error: bodyError } = await parseBody(req, bodySchema);

  if (bodyError || !body) {
    return NextResponse.json(bodyError, { status: 400 });
  }

  const supabase = await createClient();

  await addDeveloperTotalLoc({
    supabaseClient: supabase,
    changes: body.changes,
    userId,
  });

  return NextResponse.json(
    {
      success: true,
    },
    { status: 200 },
  );
}
