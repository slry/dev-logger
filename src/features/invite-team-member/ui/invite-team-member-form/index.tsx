'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/shadcn/ui/button';
import { CopyField } from '@/shared/shadcn/ui/copy-field';
import { Form } from '@/shared/shadcn/ui/form';

import { createNewInviteLink } from '../../api/actions';

interface InviteTeamMemberFormProps {
  baseUrl: string;
  onComplete: () => void;
  teamId: string;
}

export const InviteTeamMemberForm: FC<InviteTeamMemberFormProps> = ({
  baseUrl,
  teamId,
  onComplete,
}) => {
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const form = useForm();

  const submit = form.handleSubmit(async () => {
    try {
      const { teamId: inviteTeamId, id } = await createNewInviteLink(teamId);
      const newInviteLink = `${baseUrl}/team/${inviteTeamId}/invite/${id}`;
      setInviteLink(newInviteLink);
    } catch (error) {
      console.error('Error creating link:', error);
    }
  });

  if (inviteLink) {
    return (
      <div className="flex flex-col gap-4">
        <CopyField value={inviteLink} />
        <div className="flex justify-end">
          <Button onClick={onComplete}>Close</Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={submit}>
        <div className="flex justify-end">
          <Button loading={form.formState.isSubmitting} type="submit" variant="green">
            Create new link
          </Button>
        </div>
      </form>
    </Form>
  );
};
