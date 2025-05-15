import { describe, expect, it } from 'vitest';

import { NextSupabaseClient } from '@/shared/api/supabase/next';
import { createClient, createSupabaseMockResponse } from '@/shared/test/mocks/supabase';

import { addDeveloperLocPerDay } from '../addDeveloperLocPerDay';

describe('addDeveloperLocPerDay', () => {
  it('Default case', async () => {
    const mockResponse = createSupabaseMockResponse({});
    createClient.mockResolvedValue(mockResponse);
    await addDeveloperLocPerDay({
      supabaseClient: mockResponse as unknown as NextSupabaseClient,
      changes: [
        {
          added: 1,
          deleted: 0,
          file: 'file1',
        },
      ],
      timestamp: '2023-01-01T00:00:00.000Z',
      userId: 'user-id',
      teamId: 'team-id',
      repoUrl: 'https://github.com/repo-url',
    });

    expect(mockResponse.from).toHaveBeenCalled();
  });
});
