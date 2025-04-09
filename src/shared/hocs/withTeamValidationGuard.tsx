import { redirect } from 'next/navigation';

import { validateTeamId } from '../api/validate-team-id';

export const withTeamValidationGuard = <T extends { teamId: string }>(
  Component: React.FC<T>,
) => {
  const WithTeamValidationGuard = async (props: T) => {
    const { teamId } = props as { teamId: string };
    const { valid, teamId: validatedTeamId } = await validateTeamId(teamId);
    if (!valid || !validatedTeamId) redirect('/team/personal/dashboard');
    return <Component {...props} />;
  };

  WithTeamValidationGuard.displayName = `WithTeamValidationGuard(${Component.displayName || Component.name})`;

  return WithTeamValidationGuard;
};
