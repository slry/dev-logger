import { FC } from 'react';

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

interface AddGitlabRepoProps {
  teamId: string;
}

export const AddGitlabRepo: FC<AddGitlabRepoProps> = ({ teamId }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="green">Add Gitlab Repo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Gitlab Repo</DialogTitle>
          <DialogDescription className="hidden">
            This form adds a new Gitlab repository to the team
          </DialogDescription>
        </DialogHeader>
        <AddGitlabRepoForm teamId={teamId} />
      </DialogContent>
    </Dialog>
  );
};
