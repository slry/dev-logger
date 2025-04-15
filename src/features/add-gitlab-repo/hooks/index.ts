'use client';

import { useQuery } from '@tanstack/react-query';

import { getTeamGitlabReposQueryOptions } from '@/widgets/gitlab-repo-list/api/queryKeys';

import { getReposQueryOptions } from '../api/queryKeys';
import { GitlabRepoTransformed } from '../model';

export const useGetGitlabReposOptionsQuery = (teamId: string) => {
  const getTeamReposQOs = getTeamGitlabReposQueryOptions(teamId);
  const getReposQOs = getReposQueryOptions(teamId);
  const { data: reposData } = useQuery(getReposQOs);
  const { data: teamReposData } = useQuery(getTeamReposQOs);

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

  return { repos: filteredRepos, mappedRepos, getTeamReposQOs, getReposQOs };
};
