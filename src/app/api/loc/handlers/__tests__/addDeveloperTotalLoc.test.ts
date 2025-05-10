import { describe, it, expect } from 'vitest';

import { NextSupabaseClient } from '@/shared/api/supabase/next';
import { createSupabaseMockResponse } from '@/shared/test/mocks/supabase';
import { createClient } from '@/shared/test/mocks/supabase';

import { addDeveloperTotalLoc } from '../addDeveloperTotalLoc';

describe('addDeveloperTotalLoc', () => {
  it('Default case', async () => {
    const mockResponse = createSupabaseMockResponse({});
    createClient.mockResolvedValue(mockResponse);
    await addDeveloperTotalLoc({
      supabaseClient: mockResponse as unknown as NextSupabaseClient,
      changes: [
        {
          added: 1,
          deleted: 0,
          file: 'file1',
        },
      ],
      userId: 'user-id',
      teamId: 'team-id',
      repoUrl: 'https://github.com/repo-url',
    });

    expect(mockResponse.from).toHaveBeenCalled();
  });
});
