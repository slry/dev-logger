import { Plus } from 'lucide-react';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/shadcn/ui/dialog';
import { DropdownMenuItem } from '@/shared/shadcn/ui/dropdown-menu';

import { CreateTeamForm } from './create-team-form';

export const CreateTeamDialog = () => {
  const [open, setOpen] = useState(false);
  const onComplete = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="gap-2 p-2">
          <div className="flex size-6 items-center justify-center rounded-md border bg-background">
            <Plus width={16} height={16} />
          </div>
          <div className="font-medium text-muted-foreground">Add team</div>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new team</DialogTitle>
          <DialogDescription>
            To create a new team, please provide the following information:
          </DialogDescription>
        </DialogHeader>
        <CreateTeamForm onComplete={onComplete} />
      </DialogContent>
    </Dialog>
  );
};
