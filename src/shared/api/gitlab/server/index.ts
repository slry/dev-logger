import { Gitlab } from '@gitbeaker/rest';
export const createGitlabClient = (token: string) => {
  return new Gitlab({
    token: token,
    host: process.env.GITLAB_HOST,
  });
};
