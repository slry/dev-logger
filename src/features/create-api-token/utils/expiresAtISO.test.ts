import { beforeEach, describe, expect, it, vi } from 'vitest';

import { expiresAtISO } from './expiresAtISO';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2023-10-01T00:00:00Z'));
});

describe('Test expiresAtISO', async () => {
  it('should return a date in ISO format', () => {
    const days = 5;
    const result = expiresAtISO(days);

    const dateResult = result.split('T')[0];

    expect(dateResult).toBe('2023-10-06');
  });
});
