'use server';

import { getUserId } from '@/shared/api/get-user-id';
import { isUserTeamOwner } from '@/shared/api/is-user-team-owner';
import { createClient } from '@/shared/api/supabase/server';

import { inviteLinkSchema } from '../model';

export const createNewInviteLink = async (teamId: string) => {
  const userId = await getUserId();

  const isOwner = await isUserTeamOwner(teamId, userId);

  if (!isOwner) {
    throw new Error('You are not the owner of this team');
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('team_invites')
    .insert({
      team_id: teamId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return inviteLinkSchema.parse(data);
};
