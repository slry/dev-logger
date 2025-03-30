'use client';
import { useQuery } from '@tanstack/react-query';
import { CheckIcon, GitlabIcon } from 'lucide-react';

import { IntegrateGitlabBadge } from './integrate-gitlab-badge';
import { IntegrateGitlabDropdown } from './integrate-gitlab-dropdown';
import { IntegrateGitlabForm } from './integrate-gitlab-form';
import { isGitlabIntegratedQueryOptions } from '../api/queryOptions';

export const IntegrateGitlab = () => {
  const { data: isIntegrated } = useQuery(isGitlabIntegratedQueryOptions);

  return (
    <section className="flex w-[50%] flex-col gap-2 rounded-md border border-orange-600/20 bg-orange-600/5 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitlabIcon />
          <h2 className="text-xl">Gitlab Integration</h2>
          <IntegrateGitlabBadge isIntegrated={!!isIntegrated} />
        </div>
        <IntegrateGitlabDropdown />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm">
          Integrate with Gitlab to get the most out of your projects.
        </p>
        {isIntegrated ? (
          <div className="flex items-center gap-2 text-sm">
            <p>Congratulations! You have successfully integrated with Gitlab.</p>
            <CheckIcon className="h-4 w-4 text-green-500" />
          </div>
        ) : (
          <IntegrateGitlabForm />
        )}
      </div>
    </section>
  );
};
