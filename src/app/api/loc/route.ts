import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { createClient } from '@/shared/api/supabase/next';
import { validateToken } from '@/shared/api/validate-token';
import { parseBody } from '@/shared/lib/parseBody';

const changeSchema = z.object({
  file: z.string(),
  added: z.number(),
  deleted: z.number(),
});

const bodySchema = z.object({
  changes: changeSchema.array(),
  timestamp: z.string(),
});

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

  const table = supabase.from('developer_total_loc');
  const selector = table.select('*');

  body.changes.forEach(async (change) => {
    const { data } = await selector.eq('filename', change.file).eq('user_id', userId);

    if (data) {
      const currentData = data[0];
      await table.update({
        user_id: currentData.user_id,
        filename: currentData.filename,
        loc_added: (currentData.loc_added || 0) + change.added,
        loc_removed: (currentData.loc_removed || 0) + change.deleted,
      });
    } else {
      await table.insert({
        user_id: userId,
        filename: change.file,
        loc_added: change.added,
        loc_removed: change.deleted,
      });
    }
  });

  return NextResponse.json(
    {
      success: true,
    },
    { status: 200 },
  );
}
