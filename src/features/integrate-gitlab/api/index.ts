'use server';

import { createGitlabClient } from '@/shared/api/create-gitlab-client';

export const validateGitlabToken = async (token: string) => {
  try {
    const client = createGitlabClient(token);
    await client.Users.all();
    return true;
  } catch (error) {
    console.error('Error validating Gitlab token:', error);
    return false;
  }
};
