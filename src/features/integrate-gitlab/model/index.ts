import { z } from 'zod';

import { validateGitlabToken } from '../api';

const GITLAB_TOKEN_REGEX = /glpat-[0-9a-zA-Z\-\_]{20}/;

export const integrateGitlabSchema = z.object({
  token: z
    .string()
    .regex(GITLAB_TOKEN_REGEX, 'Token is not a valid Gitlab token')
    .refine(
      async (token) => {
        if (!GITLAB_TOKEN_REGEX.test(token)) return false;
        const isValid = await validateGitlabToken(token);
        return isValid;
      },
      {
        message: 'Token is invalid',
      },
    ),
});
