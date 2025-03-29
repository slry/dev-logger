import { IntegrateGitlab } from '@/features/integrate-gitlab/ui';

export const IntegrationsPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <IntegrateGitlab />
    </div>
  );
};
