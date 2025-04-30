'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';

import { useLoadingHandleClick } from '@/shared/hooks/useLoadingHandleClick';
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
import { DropdownMenuItem } from '@/shared/shadcn/ui/dropdown-menu';

import { revokeGitlabToken } from '../../api/actions';
import { isGitlabIntegratedQueryOptions } from '../../api/queryOptions';

interface IntegrateGitlabRevokeAlertDialogProps {
  onCompelete?: () => void;
}

export const IntegrateGitlabRevokeAlertDialog: FC<
  IntegrateGitlabRevokeAlertDialogProps
> = ({ onCompelete }) => {
  const queryClient = useQueryClient();
  const { data: isGitlabIntegrated } = useQuery(isGitlabIntegratedQueryOptions);

  const { loading, handleClick } = useLoadingHandleClick(async () => {
    try {
      await revokeGitlabToken();
      queryClient.invalidateQueries(isGitlabIntegratedQueryOptions);
      onCompelete?.();
    } catch (e) {
      console.error('Error revoking Gitlab token:', e);
    }
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          disabled={!isGitlabIntegrated}
          onSelect={(e) => e.preventDefault()}
          className="text-red-500"
        >
          Revoke
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to revoke the Gitlab integration?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You will need to re-integrate with Gitlab to
            restore the integration.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCompelete}>Cancel</AlertDialogCancel>
          <Button loading={loading} onClick={handleClick} variant="red">
            Revoke
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
