import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { validateToken } from '@/shared/api/validate-token';
import { withMockedSupabaseResponse } from '@/shared/test/mocks/supabase';

import { POST } from './route';

describe('POST api/loc', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('default', async () => {
    vi.mocked(validateToken).mockImplementation(async () => ({
      data: { user_id: 'user-id', team_id: 'team-id' },
      error: null,
    }));

    await withMockedSupabaseResponse({
      testFn: async () => {
        const req = new NextRequest(
          new URL('http://localhost:3000/api/loc?token=token'),
          {
            method: 'POST',
            body: JSON.stringify({
              token: 'token',
              changes: [
                {
                  added: 1,
                  deleted: 0,
                  file: 'file1',
                },
              ],
              timestamp: '2023-01-01T00:00:00.000Z',
              repoUrl: 'https://github.com/repo-url',
            }),
          },
        );

        const res = await POST(req);
        const response = await res.json();

        expect(response).toEqual({
          success: true,
        });
      },
    });
  });

  it('Missing token', async () => {
    vi.mocked(validateToken).mockImplementation(async () => ({
      data: { user_id: 'user-id', team_id: 'team-id' },
      error: null,
    }));

    const req = new NextRequest(new URL('http://localhost:3000/api/loc'), {
      method: 'POST',
      body: JSON.stringify({
        changes: [
          {
            added: 1,
            deleted: 0,
            file: 'file1',
          },
        ],
        timestamp: '2023-01-01T00:00:00.000Z',
        repoUrl: 'https://github.com/repo-url',
      }),
    });

    const res = await POST(req);
    const response = await res.json();

    expect(response).toEqual('Missing token');
  });

  it('Invalid token', async () => {
    vi.mocked(validateToken).mockImplementation(async () => ({
      data: null,
      error: 'error',
    }));

    const req = new NextRequest(new URL('http://localhost:3000/api/loc?token=token'), {
      method: 'POST',
      body: JSON.stringify({
        changes: [
          {
            added: 1,
            deleted: 0,
            file: 'file1',
          },
        ],
        timestamp: '2023-01-01T00:00:00.000Z',
        repoUrl: 'https://github.com/repo-url',
      }),
    });

    const res = await POST(req);
    const response = await res.json();

    expect(response).toEqual('error');
  });
});
