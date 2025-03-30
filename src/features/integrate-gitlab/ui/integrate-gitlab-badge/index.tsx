import { FC } from 'react';

import { Badge } from '@/shared/shadcn/ui/badge';

interface IntegrateGitlabBadgeProps {
  isIntegrated: boolean;
}

export const IntegrateGitlabBadge: FC<IntegrateGitlabBadgeProps> = ({ isIntegrated }) => {
  return (
    <Badge
      variant={isIntegrated ? 'success' : 'destructive'}
      className="cursor-pointer text-white"
    >
      {isIntegrated ? 'Integrated' : 'Not Integrated'}
    </Badge>
  );
};
