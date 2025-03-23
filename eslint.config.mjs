import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_TypeTest',
          argsIgnorePattern: '^_',
        },
      ],
      'import/order': [
        'error',
        {
          pathGroups: [
            {
              pattern: '@/app/**',
              group: 'internal',
            },
            {
              pattern: '@/views/**',
              group: 'internal',
            },
            {
              pattern: '@/widgets/**',
              group: 'internal',
            },
            {
              pattern: '@/features/**',
              group: 'internal',
            },
            {
              pattern: '@/shared/**',
              group: 'internal',
            },
          ],
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  eslintPluginPrettier,
];

export default eslintConfig;
