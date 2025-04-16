import { NextRequest, NextResponse } from 'next/server';
import { ZodType } from 'zod';

import { validateToken } from './validate-token';
import { parseBody } from '../lib/parseBody';

type HandlerParamsBase = {
  req: NextRequest;
  token: string;
  teamId: string;
  userId: string;
};

type HandlerParams<BodyType> = BodyType extends object
  ? HandlerParamsBase & { body: BodyType }
  : HandlerParamsBase;

type Handler<BodyType> = (params: HandlerParams<BodyType>) => Promise<NextResponse>;

type WithTokenValidationQueryParams<BodyType> = {
  handler: Handler<BodyType>;
  bodySchema?: ZodType<BodyType>;
};

export const withTokenValidationQuery =
  <BodyType>({ handler, bodySchema }: WithTokenValidationQueryParams<BodyType>) =>
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

    if (bodySchema) {
      const { data: body, error: bodyError } = await parseBody(req, bodySchema);

      if (bodyError || !body) {
        return NextResponse.json(bodyError, { status: 400 });
      }

      return handler({ req, token, userId, teamId, body } as HandlerParams<BodyType>);
    }

    return handler({ req, token, userId, teamId } as HandlerParams<never>);
  };
