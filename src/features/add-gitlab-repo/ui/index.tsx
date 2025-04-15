'use client';
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

import { AddGitlabRepoForm } from './add-gitlab-repo-form';
import { useGetGitlabReposOptionsQuery } from '../hooks';

interface AddGitlabRepoProps {
  teamId: string;
}

export const AddGitlabRepo: FC<AddGitlabRepoProps> = ({ teamId }) => {
  const query = useGetGitlabReposOptionsQuery(teamId);
  const [open, setOpen] = useState(false);

  const onComplete = () => {
    setOpen(false);
  };

  const isButtonDisabled = !query || query.repos.length === 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="green" disabled={isButtonDisabled}>
          Add new repository
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Gitlab Repo</DialogTitle>
          <DialogDescription className="hidden">
            This form adds a new Gitlab repository to the team
          </DialogDescription>
        </DialogHeader>
        <AddGitlabRepoForm onComplete={onComplete} teamId={teamId} />
      </DialogContent>
    </Dialog>
  );
};
