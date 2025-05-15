import { redirect } from 'next/navigation';

import { validateTeamId } from '@/entities/team/api/actions';

import { joinTeam } from '../api/actions';

export const InvitePage = async ({
  params,
}: {
  params: Promise<{ teamId: string; inviteId: string }>;
}) => {
  const { teamId, inviteId } = await params;
  const { valid, teamId: validatedTeamId } = await validateTeamId(teamId);
  if (!valid || !validatedTeamId) redirect('/team/personal/dashboard');

  try {
    await joinTeam(validatedTeamId, inviteId);
    redirect(`/team/${validatedTeamId}/dashboard`);
  } catch (error) {
    console.error(error);
    redirect('/team/personal/dashboard');
  }
};
