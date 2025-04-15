import { z } from 'zod';

export const addGitlabRepoFormSchema = z.object({
  repo: z.string(),
});

export const gitlabRepoSchemaTransformer = (teamId: string) =>
  z
    .object({
      id: z.number(),
      name: z.string(),
      description: z.string().nullable(),
      web_url: z.string(),
    })
    .transform(({ web_url, ...data }) => ({
      ...data,
      url: web_url,
      team_id: teamId,
    }));

export type AddGitlabRepoFormSchema = z.infer<typeof addGitlabRepoFormSchema>;
export type GitlabRepoTransformed = z.infer<
  ReturnType<typeof gitlabRepoSchemaTransformer>
>;
