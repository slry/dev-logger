import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { validateToken } from '@/shared/api/validate-token';
import { createClient, createSupabaseMockResponse } from '@/shared/test/mocks/supabase';

import { POST } from './route';

const mockResponse = createSupabaseMockResponse({});
createClient.mockResolvedValue(mockResponse);

vi.mock('@/shared/api/validate-token', async (importOriginal) => {
  const og = await importOriginal<typeof import('@/shared/api/validate-token')>();
  return {
    validateToken: vi.fn().mockImplementation(og.validateToken),
  };
});

describe('POST api/time', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('default', async () => {
    vi.mocked(validateToken).mockImplementation(async () => ({
      data: { user_id: 'user-id', team_id: 'team-id' },
      error: null,
    }));

    const req = new NextRequest(new URL('http://localhost:3000/api/time?token=token'), {
      method: 'POST',
      body: JSON.stringify({
        time: 10,
        timestamp: '2023-01-01T00:00:00.000Z',
        repoUrl: 'https://github.com/repo-url',
      }),
    });

    const res = await POST(req);
    const response = await res.json();

    expect(response).toEqual({
      success: true,
    });
  });

  it('Missing token', async () => {
    vi.mocked(validateToken).mockImplementation(async () => ({
      data: { user_id: 'user-id', team_id: 'team-id' },
      error: null,
    }));

    const req = new NextRequest(new URL('http://localhost:3000/api/time'), {
      method: 'POST',
      body: JSON.stringify({
        time: 10,
        timestamp: '2023-01-01T00:00:00.000Z',
        repoUrl: 'https://github.com/repo-url',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
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

    const req = new NextRequest(new URL('http://localhost:3000/api/time?token=token'), {
      method: 'POST',
      body: JSON.stringify({
        time: 10,
        timestamp: '2023-01-01T00:00:00.000Z',
        repoUrl: 'https://github.com/repo-url',
      }),
    });

    const res = await POST(req);
    const response = await res.json();

    expect(response).toEqual('error');
  });
});
