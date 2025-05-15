import { vi } from 'vitest';

interface SupabaseClientMockParams {
  authUser?: {
    data: {
      user: {
        id: string;
        user_metadata: {
          name: string;
          surname: string;
          email: string;
        };
      };
    };
    error: string | null;
  };
  dataMock?: Record<string, unknown>;
}

export const createSupabaseMockResponse = ({
  authUser = {
    data: {
      user: {
        id: 'user-id',
        user_metadata: { name: 'name', surname: 'surname', email: 'email' },
      },
    },
    error: null,
  },
  dataMock,
}: SupabaseClientMockParams) => {
  const fromChain = {
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    on: vi.fn().mockReturnThis(),
    ...dataMock,
  };

  const client = {
    auth: {
      signUp: vi.fn().mockResolvedValue(authUser),
      getUser: vi.fn().mockResolvedValue(authUser),
    },
    from: vi.fn(() => fromChain),
    rpc: vi.fn().mockResolvedValue(dataMock),
  };

  return client;
};

interface WithMockedSupabaseResponseParams {
  testFn: () => Promise<void>;
  mockResponse?: SupabaseClientMockParams | SupabaseClientMockParams[];
}

export const createClient = vi.fn();

export const withMockedSupabaseResponse = async ({
  testFn,
  mockResponse = {},
}: WithMockedSupabaseResponseParams) => {
  if (Array.isArray(mockResponse)) {
    mockResponse.forEach((mock) => {
      createClient.mockResolvedValueOnce(createSupabaseMockResponse(mock));
    });
  } else {
    const mockClient = createSupabaseMockResponse(mockResponse);
    createClient.mockResolvedValue(mockClient);
  }

  await testFn();
  createClient.mockReset();
};
