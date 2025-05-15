import 'server-only';
import { getUserId } from '@/shared/api/get-user-id';
import { createClient } from '@/shared/api/supabase/next';

const isTeamMember = async (teamId: string, userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('developer_team')
    .select('role')
    .eq('team_id', teamId)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error);
    return false;
  }

  return !!data;
};

export const joinTeam = async (teamId: string, inviteId: string) => {
  const userId = await getUserId();

  const isMember = await isTeamMember(teamId, userId);

  if (isMember) {
    throw new Error('You are already a member of this team');
  }

  const supabase = await createClient();
  const getInviteLink = await supabase
    .from('team_invites')
    .select('*')
    .eq('id', inviteId)
    .eq('team_id', teamId)
    .single();

  if (getInviteLink.error) {
    console.error(getInviteLink.error);
    throw new Error('Invalid invite link');
  }

  const isExpired = new Date(getInviteLink.data.expires_after).getTime() < Date.now();

  if (isExpired) {
    throw new Error('Invite link has expired');
  }

  const addMember = await supabase.from('developer_team').insert({
    user_id: userId,
    team_id: teamId,
    role: 'DEVELOPER',
  });

  if (addMember.error) {
    console.error(addMember.error);
    throw new Error('Failed to join team');
  }

  const deleteInviteLink = await supabase
    .from('team_invites')
    .delete()
    .eq('id', inviteId);

  if (deleteInviteLink.error) {
    console.error(deleteInviteLink.error);
    throw new Error('Failed to delete invite link');
  }

  return true;
};
