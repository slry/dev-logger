import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getUserId } from '@/shared/api/get-user-id';
import { isUserTeamOwner } from '@/shared/api/is-user-team-owner';
import { withMockedSupabaseResponse } from '@/shared/test/mocks/supabase';

import {
  getCurrentTeamById,
  getPersonalTeam,
  getTeamById,
  getTeamMemberList,
} from './actions';

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

describe('getCurrentTeamById', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('default case', async () => {
    vi.mocked(getUserId).mockResolvedValue('user-id');
    await withMockedSupabaseResponse({
      testFn: async () => {
        const currentTeam = await getCurrentTeamById('team-id');
        expect(currentTeam).toEqual({
          id: 'team-id',
          name: 'name',
          icon: 'icon',
          role: 'OWNER',
        });
      },
      mockResponse: {
        dataMock: {
          data: {
            id: 'team-id',
            name: 'name',
            icon: 'icon',
            developer_team: [
              {
                user_id: 'user-id',
                role: 'OWNER',
              },
            ],
          },
        },
      },
    });
  });

  it('error case', async () => {
    vi.mocked(getUserId).mockResolvedValue('user-id');
    await withMockedSupabaseResponse({
      testFn: async () => {
        try {
          await getCurrentTeamById('team-id');
        } catch (error) {
          if (error instanceof Error) {
            expect(error.message).toEqual('Error fetching team: error');
          }
        }
      },
      mockResponse: {
        dataMock: {
          error: new Error('error'),
        },
      },
    });
  });
});

describe('getTeamById', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('default case', async () => {
    await withMockedSupabaseResponse({
      testFn: async () => {
        const team = await getTeamById('team-id');
        expect(team).toEqual({
          id: 'team-id',
          name: 'name',
          icon: 'icon',
        });
      },
      mockResponse: {
        dataMock: {
          data: {
            id: 'team-id',
            name: 'name',
            icon: 'icon',
          },
        },
      },
    });
  });

  it('error case', async () => {
    await withMockedSupabaseResponse({
      testFn: async () => {
        const team = await getTeamById('team-id');
        expect(team).toEqual(null);
      },
      mockResponse: {
        dataMock: {
          error: new Error('error'),
        },
      },
    });
  });
});

describe('getPersonalTeam', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('default case', async () => {
    await withMockedSupabaseResponse({
      testFn: async () => {
        const personalTeam = await getPersonalTeam();
        expect(personalTeam).toEqual({
          user_id: 'user-id',
          personal_team_id: 'team-id',
        });
      },
      mockResponse: {
        dataMock: {
          data: {
            user_id: 'user-id',
            personal_team_id: 'team-id',
          },
        },
      },
    });
  });

  it('error case', async () => {
    vi.mocked(getUserId).mockResolvedValue('user-id');
    await withMockedSupabaseResponse({
      testFn: async () => {
        const personalTeam = await getPersonalTeam();
        expect(personalTeam).toEqual(null);
      },
      mockResponse: {
        dataMock: {
          error: new Error('error'),
        },
      },
    });
  });
});
