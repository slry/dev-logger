import { GitlabIcon } from 'lucide-react';

import { IntegrateGitlabBadge } from './integrate-gitlab-badge';
import { IntegrateGitlabForm } from './integrate-gitlab-form';

export const IntegrateGitlab = () => {
  return (
    <section className="flex w-[50%] flex-col gap-2 rounded-md border border-orange-600/20 bg-orange-600/5 p-4">
      <div className="flex gap-2">
        <GitlabIcon />
        <h2>Gitlab Integration</h2>
        <IntegrateGitlabBadge />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Integrate with Gitlab to get the most out of your projects.
        </p>
        <IntegrateGitlabForm />
      </div>
    </section>
  );
};
