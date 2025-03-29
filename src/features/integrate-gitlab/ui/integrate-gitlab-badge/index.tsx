import { Badge } from '@/shared/shadcn/ui/badge';

export const IntegrateGitlabBadge = () => {
  const isIntegrated = false; // Replace with actual integration check logic
  return (
    <Badge variant={isIntegrated ? 'default' : 'destructive'} className="cursor-pointer">
      {isIntegrated ? 'Integrated' : 'Not Integrated'}
    </Badge>
  );
};
