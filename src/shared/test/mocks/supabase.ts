import { vi } from 'vitest';

interface SupabaseClientMockParams {
  authUser?: { id: string };
  dataMock?: Record<string, unknown>;
}

export const createSupabaseMockResponse = ({
  authUser = { id: 'user-id' },
  dataMock,
}: SupabaseClientMockParams) => {
  const fromChain = {
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    on: vi.fn().mockReturnThis(),
    ...dataMock,
  };

  const client = {
    auth: {
      signUp: vi.fn().mockResolvedValue({ data: { user: authUser }, error: null }),
    },
    from: vi.fn(() => fromChain),
  };

  return client;
};

export const createClient = vi.fn();
