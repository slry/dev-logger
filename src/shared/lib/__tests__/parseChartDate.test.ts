import { describe, expect, it } from 'vitest';

import { parseChartDate } from '../parseChartDate';

describe('parseChartDate', () => {
  it('should parse date', () => {
    const date = '2023-01-01T00:00:00.000Z';
    const parsedDate = parseChartDate(date);
    expect(parsedDate).toEqual('Jan 1');
  });
});
