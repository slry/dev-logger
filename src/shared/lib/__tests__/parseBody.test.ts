import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { parseBody } from '../parseBody';

describe('parseBody', () => {
  it('should parse body', async () => {
    const nextRequest = new NextRequest(new URL('http://localhost'), {
      method: 'POST',
      body: JSON.stringify({ foo: 'bar' }),
    });

    const zodSchema = z.object({ foo: z.string() });

    const { data } = await parseBody(nextRequest, zodSchema);

    expect(data).toEqual({ foo: 'bar' });
  });

  it('should return error if body is missing', async () => {
    const nextRequest = new NextRequest(new URL('http://localhost'), {
      method: 'POST',
    });

    const zodSchema = z.object({ foo: z.string() });

    const { error } = await parseBody(nextRequest, zodSchema);

    expect(error).toEqual('Missing body');
  });

  it('should return error if body is invalid', async () => {
    const nextRequest = new NextRequest(new URL('http://localhost'), {
      method: 'POST',
      body: JSON.stringify({ foo: 123 }),
    });

    const zodSchema = z.object({ foo: z.string() });

    const { error } = await parseBody(nextRequest, zodSchema);

    expect(error).toEqual('Invalid body');
  });
});
