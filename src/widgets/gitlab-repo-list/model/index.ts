import { z } from 'zod';

import { Database } from '@/shared/api/supabase/types';
import { snakeToCamelCase } from '@/shared/lib/snakeToCamelCase';
import { Expect, IsSameType } from '@/shared/test/types';

export const gitlabRepoDTOSchema = z.object({
  url: z.string(),
  name: z.string(),
  description: z.string(),
  team_id: z.string(),
});

export const gitlabRepoSchema = gitlabRepoDTOSchema.transform(snakeToCamelCase);

export type GitlabRepoDTOSchema = z.infer<typeof gitlabRepoDTOSchema>;
export type GitlabRepoSchema = z.infer<typeof gitlabRepoSchema>;

// Type Test
type GitlabRepoDTODatabase = Database['public']['Tables']['gitlab_repos']['Row'];

type _TypeTest = Expect<IsSameType<GitlabRepoDTOSchema, GitlabRepoDTODatabase>>;
