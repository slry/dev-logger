'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/shadcn/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/shadcn/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/shadcn/ui/select';
import { getTeamGitlabReposQueryOptions } from '@/widgets/gitlab-repo-list/api/queryKeys';

import { addRepoToTeam } from '../../api';
import { getReposQueryOptions } from '../../api/queryKeys';
import {
  addGitlabRepoFormSchema,
  AddGitlabRepoFormSchema,
  GitlabRepoTransformed,
} from '../../model';

interface AddGitlabRepoFormProps {
  teamId: string;
}

export const AddGitlabRepoForm: FC<AddGitlabRepoFormProps> = ({ teamId }) => {
  const queryClient = useQueryClient();
  const getTeamReposQOs = getTeamGitlabReposQueryOptions(teamId);
  const getReposQOs = getReposQueryOptions(teamId);
  const { data: reposData } = useQuery(getReposQOs);
  const { data: teamReposData } = useQuery(getTeamReposQOs);

  const form = useForm<AddGitlabRepoFormSchema>({
    resolver: zodResolver(addGitlabRepoFormSchema),
  });

  if (!reposData) {
    return null;
  }

  const filteredRepos = reposData.filter((repo) => {
    const isRepoInTeam = teamReposData?.some((teamRepo) => teamRepo.url === repo.url);
    return !isRepoInTeam;
  });

  const mappedRepos = filteredRepos.reduce<Record<string, GitlabRepoTransformed>>(
    (acc, repo) => {
      acc[`repo-#${repo.id}`] = repo;
      return acc;
    },
    {},
  );

  const submit = form.handleSubmit(async (data) => {
    try {
      const selectedRepo = mappedRepos[data.repo];
      console.log('selectedRepo', selectedRepo);

      await addRepoToTeam(teamId, selectedRepo);
      await queryClient.invalidateQueries(getTeamReposQOs);
      await queryClient.invalidateQueries(getReposQOs);
    } catch {
      console.error('Error adding repo to team');
      form.setError('repo', {
        message: 'Error adding repo to team',
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="repo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gitlab repository</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      className="placeholder:text-gray-300"
                      placeholder="Select a gitlab repo"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredRepos.map((repo) => (
                    <SelectItem key={`repo-#${repo.id}`} value={`repo-#${repo.id}`}>
                      {repo.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select a Gitlab repository to add to the team.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button loading={form.formState.isSubmitting} type="submit" variant="green">
            Add repository
          </Button>
        </div>
      </form>
    </Form>
  );
};
