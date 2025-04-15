'use client';
import { useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { FC, useState } from 'react';

import { useLoadingHandleClick } from '@/shared/hooks/useLoadingHandleClick';
import { useTeamContext } from '@/shared/providers/team-context';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/shadcn/ui/alert-dialog';
import { Button } from '@/shared/shadcn/ui/button';
import { getApiTokensListQueryOptions } from '@/views/api-settings/api/queryKeys';

import { deleteAPIToken } from '../api';

interface DeleteApiTokenButtonProps {
  tokenName: string;
  tokenId: number;
}

export const DeleteApiTokenButton: FC<DeleteApiTokenButtonProps> = ({
  tokenName,
  tokenId,
}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const currentTeamId = useTeamContext();
  const qo = getApiTokensListQueryOptions(currentTeamId);

  const { loading, handleClick } = useLoadingHandleClick(async () => {
    await deleteAPIToken(tokenId);
    await queryClient.invalidateQueries(qo);
    setOpen(false);
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        title="Delete"
        className="flex h-8 w-8 items-center justify-center"
      >
        <Trash width={16} height={16} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure that you want to delete this API Token?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{' '}
            <span className="whitespace-nowrap font-extrabold">{tokenName}</span> API
            Token.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button variant="red" loading={loading} onClick={handleClick}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
