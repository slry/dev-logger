import { z } from 'zod';

import { validateGitlabToken } from '../api/actions';

export const integrateGitlabSchema = z.object({
  token: z
    .string()
    .startsWith('glpat-', 'Token is not a valid Gitlab token')
    .refine(
      async (token) => {
        if (!token.startsWith('glpat-')) return false;
        const isValid = await validateGitlabToken(token);
        return isValid;
      },
      {
        message: 'Token is invalid',
      },
    ),
});
