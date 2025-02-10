import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { createClient } from '@/shared/api/supabase/server';

const tokenSchema = z.object({
  id: z.number(),
  key: z.string(),
  user_id: z.string(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json('Missing token', { status: 400 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase.from('api_tokens').select('*').eq('key', token);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json('Invalid token', { status: 400 });
  }

  try {
    const { user_id } = tokenSchema.parse(data[0]);
    return NextResponse.json({ user_id });
  } catch {
    return NextResponse.json('Invalid token', { status: 400 });
  }
}
