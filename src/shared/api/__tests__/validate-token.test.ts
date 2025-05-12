import { describe } from 'node:test';

import { expect, it } from 'vitest';

import { withMockedSupabaseResponse } from '@/shared/test/mocks/supabase';

import { validateToken } from '../validate-token';

describe('validateToken', () => {
  it('Default case', async () => {
    await withMockedSupabaseResponse({
      testFn: async () => {
        const { data, error } = await validateToken('token');
        expect(data).toEqual({
          user_id: 'user-id',
          team_id: 'team-id',
        });
        expect(error).toBeNull();
      },
      mockResponse: {
        dataMock: {
          data: {
            user_id: 'user-id',
            team_id: 'team-id',
          },
          error: null,
        },
      },
    });
  });

  it('Token expired', async () => {
    await withMockedSupabaseResponse({
      testFn: async () => {
        const { data, error } = await validateToken('token');
        expect(data).toBeNull();
        expect(error).toEqual('Token expired');
      },
      mockResponse: {
        dataMock: {
          data: {
            user_id: 'user-id',
            team_id: 'team-id',
            expires_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
          },
          error: null,
        },
      },
    });
  });

  it('Error during retrieving user_id', async () => {
    await withMockedSupabaseResponse({
      testFn: async () => {
        const { data, error } = await validateToken('token');
        expect(data).toBeNull();
        expect(error).toEqual('Invalid token (error during retrieving user_id)');
      },
      mockResponse: {
        dataMock: {
          data: null,
          error: 'error',
        },
      },
    });
  });

  it('Token not found in db', async () => {
    await withMockedSupabaseResponse({
      testFn: async () => {
        const { data, error } = await validateToken('token');
        expect(data).toBeNull();
        expect(error).toEqual('Invalid token (token not found in db)');
      },
      mockResponse: {
        dataMock: {
          data: null,
          error: null,
        },
      },
    });
  });
});
