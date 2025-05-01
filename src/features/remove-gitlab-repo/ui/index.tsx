'use client';
import { useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { FC, useState } from 'react';

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
import { getTeamGitlabReposQueryOptions } from '@/widgets/gitlab-repo-list/api/queryKeys';

import { removeGitlabRepo } from '../api/actions';

interface RemoveGitlabRepoProps {
  teamId: string;
  repoUrl: string;
}

export const RemoveGitlabRepoDialog: FC<RemoveGitlabRepoProps> = ({
  teamId,
  repoUrl,
}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const qo = getTeamGitlabReposQueryOptions(teamId);

  const { loading, handleClick } = useLoadingHandleClick(async () => {
    try {
      await removeGitlabRepo(teamId, repoUrl);
      await queryClient.invalidateQueries(qo);
      setOpen(false);
    } catch (error) {
      console.error('Error removing repo from team');
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger aria-label="Remove repository">
        <TrashIcon className="size-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to remove this repository?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will remove the repository from the team.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="red" loading={loading} onClick={handleClick}>
            Remove
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
