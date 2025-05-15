import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getUserId } from '@/shared/api/get-user-id';
import { isUserTeamOwner } from '@/shared/api/is-user-team-owner';
import { withMockedSupabaseResponse } from '@/shared/test/mocks/supabase';

import { getTeamMemberList } from './actions';

vi.mock('@/shared/api/get-user-id', () => ({
  getUserId: vi.fn(),
}));

vi.mock('@/shared/api/is-user-team-owner', () => ({
  isUserTeamOwner: vi.fn(),
}));

describe('getTeamMemberList', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('Team owner', async () => {
    vi.mocked(getUserId).mockResolvedValue('user-id');
    vi.mocked(isUserTeamOwner).mockResolvedValue(true);
    await withMockedSupabaseResponse({
      testFn: async () => {
        const teamMemberList = await getTeamMemberList('team-id');
        expect(teamMemberList).toEqual([
          {
            userId: 'user-id',
            role: 'OWNER',
            name: 'name',
            surname: 'surname',
            email: 'email',
          },
        ]);
      },
      mockResponse: {
        dataMock: {
          data: [
            {
              user_id: 'user-id',
              role: 'OWNER',
              raw_user_metadata: {
                name: 'name',
                surname: 'surname',
                email: 'email',
              },
            },
          ],
        },
      },
    });
  });

  it('Team owner (error case)', async () => {
    vi.mocked(getUserId).mockResolvedValue('user-id');
    vi.mocked(isUserTeamOwner).mockResolvedValue(true);
    await withMockedSupabaseResponse({
      testFn: async () => {
        const teamMemberList = await getTeamMemberList('team-id');
        expect(teamMemberList).toEqual([]);
      },
      mockResponse: {
        dataMock: {
          error: 'error',
        },
      },
    });
  });

  it('Team member', async () => {
    vi.mocked(getUserId).mockResolvedValue('user-id');
    vi.mocked(isUserTeamOwner).mockResolvedValue(false);
    await withMockedSupabaseResponse({
      testFn: async () => {
        const teamMemberList = await getTeamMemberList('team-id');
        expect(teamMemberList).toEqual([
          {
            userId: 'user-id',
            role: 'DEVELOPER',
            name: 'name',
            surname: 'surname',
            email: 'email',
          },
        ]);
      },
      mockResponse: {
        dataMock: {
          data: {
            user_id: 'user-id',
            role: 'DEVELOPER',
            team_id: 'team-id',
          },
        },
      },
    });
  });

  it('Team member (member error)', async () => {
    vi.mocked(getUserId).mockResolvedValue('user-id');
    vi.mocked(isUserTeamOwner).mockResolvedValue(false);
    await withMockedSupabaseResponse({
      testFn: async () => {
        const teamMemberList = await getTeamMemberList('team-id');
        expect(teamMemberList).toEqual([]);
      },
      mockResponse: {
        dataMock: {
          error: 'error',
        },
      },
    });
  });

  it('Team member (get user error)', async () => {
    vi.mocked(getUserId).mockResolvedValue('user-id');
    vi.mocked(isUserTeamOwner).mockResolvedValue(false);
    await withMockedSupabaseResponse({
      testFn: async () => {
        const teamMemberList = await getTeamMemberList('team-id');
        expect(teamMemberList).toEqual([]);
      },
      mockResponse: {
        authUser: {
          data: {
            user: {
              id: 'user-id',
              user_metadata: { name: 'name', surname: 'surname', email: 'email' },
            },
          },
          error: 'error',
        },
      },
    });
  });
});
