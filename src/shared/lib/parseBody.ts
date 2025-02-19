import { NextRequest } from 'next/server';
import { ZodType } from 'zod';

interface Success<T> {
  data: T;
  error?: never;
}

interface Error {
  error: string;
  data?: never;
}

type Result<T> = Success<T> | Error;

export const parseBody = async <T>(
  req: NextRequest,
  schema: ZodType<T>,
): Promise<Result<T>> => {
  if (!req.body) {
    return { error: 'Missing body' };
  }

  const bodyString = await streamToString(req.body);

  const bodyParsed = schema.safeParse(JSON.parse(bodyString));

  if (!bodyParsed.success) {
    return { error: 'Invalid body' };
  }

  return { data: bodyParsed.data };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function streamToString(stream: any) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}
