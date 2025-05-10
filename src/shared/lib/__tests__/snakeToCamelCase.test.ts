import { describe, expect, it } from 'vitest';

import { snakeToCamelCase } from '../snakeToCamelCase';

describe('snakeToCamelCase', () => {
  it('should convert snake case to camel case', () => {
    const snakeCaseData = {
      foo_bar: 'bar',
      foo_bar_baz: 'bar-baz',
      test_object: {
        foo_bar: 'bar',
        foo_bar_baz: 'bar-baz',
      },
      test_array: [
        {
          foo_bar: 'bar',
          foo_bar_baz: 'bar-baz',
        },
        {
          test_array: {
            foo_bar: 'bar',
            foo_bar_baz: 'bar-baz',
          },
          bar: 'baz',
        },
        'foo',

        { foo_bar: 'bar' },
      ],
    };

    const camelCaseData = snakeToCamelCase(snakeCaseData);

    expect(camelCaseData).toEqual({
      fooBar: 'bar',
      fooBarBaz: 'bar-baz',
      testObject: {
        fooBar: 'bar',
        fooBarBaz: 'bar-baz',
      },
      testArray: [
        {
          fooBar: 'bar',
          fooBarBaz: 'bar-baz',
        },
        {
          testArray: {
            fooBar: 'bar',
            fooBarBaz: 'bar-baz',
          },
          bar: 'baz',
        },
        'foo',

        { fooBar: 'bar' },
      ],
    });
  });
});
