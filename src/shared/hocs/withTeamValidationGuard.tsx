import { redirect } from 'next/navigation';
import { FC } from 'react';

import { validateTeamId } from '../api/validate-team-id';

interface ArgumentComponentProps {
  teamId: string;
}

interface WithTeamValidationGuardProps {
  params: Promise<{ teamId: string }>;
}

export const withTeamValidationGuard = (Component: FC<ArgumentComponentProps>) => {
  const WithTeamValidationGuard: FC<WithTeamValidationGuardProps> = async (props) => {
    const { teamId } = await props.params;
    const { valid, teamId: validatedTeamId } = await validateTeamId(teamId);
    if (!valid || !validatedTeamId) redirect('/team/personal/dashboard');
    return <Component teamId={validatedTeamId} />;
  };

  WithTeamValidationGuard.displayName = `WithTeamValidationGuard(${Component.displayName ?? Component.name})`;

  return WithTeamValidationGuard;
};
