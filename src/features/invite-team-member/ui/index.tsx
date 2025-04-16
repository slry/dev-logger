'use client';
import { useQuery } from '@tanstack/react-query';
import { MailIcon } from 'lucide-react';
import { FC, useState } from 'react';

import { Button } from '@/shared/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/shadcn/ui/dialog';

import { InviteTeamMemberForm } from './invite-team-member-form';
import { isPersonalTeamQueryOptions } from '../api/queryKeys';

interface InviteTeamMemberProps {
  teamId: string;
  baseUrl: string;
}

export const InviteTeamMember: FC<InviteTeamMemberProps> = ({ teamId, baseUrl }) => {
  const [open, setOpen] = useState(false);

  const onComplete = async () => {
    setOpen(false);
  };

  const qo = isPersonalTeamQueryOptions(teamId);
  const { data: isPersonalTeam } = useQuery(qo);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!!isPersonalTeam} variant="green" className="flex gap-1">
          <MailIcon className="size-4" />
          <span>Invite new member</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite new team member</DialogTitle>
          <DialogDescription>
            This action will create an invitation link for the new team member. You can
            share this link with them to join your team.
          </DialogDescription>
        </DialogHeader>
        <InviteTeamMemberForm teamId={teamId} baseUrl={baseUrl} onComplete={onComplete} />
      </DialogContent>
    </Dialog>
  );
};
