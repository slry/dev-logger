'use client';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { getApiTokensListQueryOptions } from '@/entities/api-token-item/api/queryKeys';
import { useTeamContext } from '@/shared/providers/team-context';
import { Button } from '@/shared/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/shared/shadcn/ui/dialog';

import { CreateAPITokenForm } from './create-api-token-form';

export const CreateAPIToken = () => {
  const queryClient = useQueryClient();
  const currentTeamId = useTeamContext();
  const qo = getApiTokensListQueryOptions(currentTeamId);
  const [open, setOpen] = useState(false);

  const invalidateOnClose = async () => {
    await queryClient.invalidateQueries(qo);
  };

  const onComplete = async () => {
    await invalidateOnClose();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="green">Create API Token</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={invalidateOnClose}>
        <DialogHeader>
          <DialogTitle>Generate New API Token</DialogTitle>
          <DialogDescription className="hidden">
            This form generates new API Token
          </DialogDescription>
        </DialogHeader>
        <CreateAPITokenForm teamId={currentTeamId} onComplete={onComplete} />
      </DialogContent>
    </Dialog>
  );
};
