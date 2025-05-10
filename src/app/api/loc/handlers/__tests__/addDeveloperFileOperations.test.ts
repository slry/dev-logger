import { describe, expect, it } from 'vitest';

import { NextSupabaseClient } from '@/shared/api/supabase/next';
import { createSupabaseMockResponse } from '@/shared/test/mocks/supabase';
import { createClient } from '@/shared/test/mocks/supabase';

import { addDeveloperFileOperations } from '../addDeveloperFileOperations';

describe('addDeveloperFileOperations', () => {
  it('Default case', async () => {
    const mockResponse = createSupabaseMockResponse({});
    createClient.mockResolvedValue(mockResponse);
    await addDeveloperFileOperations({
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
