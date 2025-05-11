import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { validateToken } from '@/shared/api/validate-token';
import { createClient, createSupabaseMockResponse } from '@/shared/test/mocks/supabase';

import { POST } from './route';

vi.mock('@/shared/api/validate-token', async (importOriginal) => {
  const og = await importOriginal<typeof import('@/shared/api/validate-token')>();
  return {
    validateToken: vi.fn().mockImplementation(og.validateToken),
  };
});

describe('POST api/file', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('default', async () => {
    const mockResponse = createSupabaseMockResponse({});
    vi.mocked(validateToken).mockImplementation(async () => ({
      data: { user_id: 'user-id', team_id: 'team-id' },
      error: null,
    }));
    createClient.mockResolvedValue(mockResponse);

    const req = new NextRequest(new URL('http://localhost:3000/api/file?token=token'), {
      method: 'POST',
      body: JSON.stringify({
        operation: 'CREATE',
        filename: 'file1',
        timestamp: '2023-01-01T00:00:00.000Z',
      }),
    });

    const res = await POST(req);
    const response = await res.json();

    expect(response).toEqual({
      success: true,
    });
  });

  it('Missing token', async () => {
    const mockResponse = createSupabaseMockResponse({});
    vi.mocked(validateToken).mockImplementation(async () => ({
      data: { user_id: 'user-id', team_id: 'team-id' },
      error: null,
    }));
    createClient.mockResolvedValue(mockResponse);

    const req = new NextRequest(new URL('http://localhost:3000/api/file'), {
      method: 'POST',
      body: JSON.stringify({
        operation: 'CREATE',
        filename: 'file1',
        timestamp: '2023-01-01T00:00:00.000Z',
      }),
    });

    const res = await POST(req);
    const response = await res.json();

    expect(response).toEqual('Missing token');
  });

  it('Invalid token', async () => {
    const mockResponse = createSupabaseMockResponse({});
    vi.mocked(validateToken).mockImplementation(async () => ({
      data: null,
      error: 'error',
    }));
    createClient.mockResolvedValue(mockResponse);
    const req = new NextRequest(new URL('http://localhost:3000/api/file?token=token'), {
      method: 'POST',
      body: JSON.stringify({
        operation: 'CREATE',
        filename: 'file1',
        timestamp: '2023-01-01T00:00:00.000Z',
      }),
    });

    const res = await POST(req);
    const response = await res.json();

    expect(response).toEqual('error');
  });
});
