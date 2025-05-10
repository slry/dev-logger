import { describe } from 'node:test';

import { expect, it } from 'vitest';

import { createClient, createSupabaseMockResponse } from '@/shared/test/mocks/supabase';

import { validateToken } from '../validate-token';

describe('validateToken', () => {
  it('Default case', async () => {
    const mockResponse = createSupabaseMockResponse({
      dataMock: {
        data: {
          user_id: 'user-id',
          team_id: 'team-id',
        },
        error: null,
      },
    });
    createClient.mockReturnValue(mockResponse);

    const { data, error } = await validateToken('token');
    expect(data).toEqual({
      user_id: 'user-id',
      team_id: 'team-id',
    });
    expect(error).toBeNull();
  });

  it('Token expired', async () => {
    const mockResponse = createSupabaseMockResponse({
      dataMock: {
        data: {
          user_id: 'user-id',
          team_id: 'team-id',
          expires_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        },
        error: null,
      },
    });
    createClient.mockReturnValue(mockResponse);

    const { data, error } = await validateToken('token');
    expect(data).toBeNull();
    expect(error).toEqual('Token expired');
  });

  it('Error during retrieving user_id', async () => {
    const mockResponse = createSupabaseMockResponse({
      dataMock: {
        data: null,
        error: 'error',
      },
    });
    createClient.mockReturnValue(mockResponse);

    const { data, error } = await validateToken('token');
    expect(data).toBeNull();
    expect(error).toEqual('Invalid token (error during retrieving user_id)');
  });

  it('Token not found in db', async () => {
    const mockResponse = createSupabaseMockResponse({
      dataMock: {
        data: null,
        error: null,
      },
    });
    createClient.mockReturnValue(mockResponse);

    const { data, error } = await validateToken('token');
    expect(data).toBeNull();
    expect(error).toEqual('Invalid token (token not found in db)');
  });
});
