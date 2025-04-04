import { NextRequest, NextResponse } from 'next/server';
import { ZodType } from 'zod';

import { validateToken } from './validate-token';
import { parseBody } from '../lib/parseBody';

type HandlerParams<T> = {
  req: NextRequest;
  token: string;
  teamId: string;
  userId: string;
  body: T;
};

type Handler<T> = (params: HandlerParams<T>) => Promise<NextResponse>;

type WithTokenValidationQueryParams<T> = {
  handler: Handler<T>;
  bodySchema: ZodType<T>;
};

export const withTokenValidationQuery =
  <T>({ handler, bodySchema }: WithTokenValidationQueryParams<T>) =>
  async (req: NextRequest) => {
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

    return handler({ req, token, userId, teamId, body });
  };
