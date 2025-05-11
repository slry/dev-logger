import { vi } from 'vitest';

vi.mock('@/shared/api/validate-token', async (importOriginal) => {
  const og = await importOriginal<typeof import('@/shared/api/validate-token')>();
  return {
    validateToken: vi.fn().mockImplementation(og.validateToken),
  };
});

vi.mock('@/shared/api/supabase/next', async (importOriginal) => {
  const og = await importOriginal<typeof import('@/shared/api/supabase/next')>();
  const { createClient } = await import('@/shared/test/mocks/supabase');
  return {
    ...og,
    createClient,
  };
});

vi.mock('@/shared/api/supabase/server', async (importOriginal) => {
  const og = await importOriginal<typeof import('@/shared/api/supabase/server')>();
  const { createClient } = await import('@/shared/test/mocks/supabase');
  return {
    ...og,
    createClient,
  };
});

vi.mock('server-only', () => {
  return {};
});
