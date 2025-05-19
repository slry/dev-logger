import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { validateToken } from '@/shared/api/validate-token';
import { withMockedSupabaseResponse } from '@/shared/test/mocks/supabase';

import { GET } from './route';

describe('GET api/gitlab/repos', () => {
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
          new URL('http://localhost:3000/api/gitlab/repos?token=token'),
          {
            method: 'GET',
          },
        );

        const res = await GET(req);
        const response = await res.json();

        expect(response).toEqual({
          success: true,
          data: ['https://github.com/repo-url'],
        });
      },
      mockResponse: {
        dataMock: {
          data: [
            {
              url: 'https://github.com/repo-url',
            },
          ],
        },
      },
    });
  });

  it('Missing token', async () => {
    vi.mocked(validateToken).mockImplementation(async () => ({
      data: { user_id: 'user-id', team_id: 'team-id' },
      error: null,
    }));

    const req = new NextRequest(new URL('http://localhost:3000/api/gitlab/repos'), {
      method: 'GET',
    });

    const res = await GET(req);
    const response = await res.json();

    expect(response).toEqual('Missing token');
  });

  it('Invalid token', async () => {
    vi.mocked(validateToken).mockImplementation(async () => ({
      data: null,
      error: 'error',
    }));

    const req = new NextRequest(
      new URL('http://localhost:3000/api/gitlab/repos?token=token'),
      {
        method: 'GET',
      },
    );

    const res = await GET(req);
    const response = await res.json();

    expect(response).toEqual('error');
  });

  it('getTeamRepos error case', async () => {
    vi.mocked(validateToken).mockImplementation(async () => ({
      data: { user_id: 'user-id', team_id: 'team-id' },
      error: null,
    }));

    await withMockedSupabaseResponse({
      testFn: async () => {
        const req = new NextRequest(
          new URL('http://localhost:3000/api/gitlab/repos?token=token'),
          {
            method: 'GET',
          },
        );

        const res = await GET(req);
        const response = await res.json();

        expect(response).toEqual('error');
      },
      mockResponse: {
        dataMock: {
          error: new Error('error'),
        },
      },
    });
  });
});
