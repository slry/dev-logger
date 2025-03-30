import { EllipsisVerticalIcon } from 'lucide-react';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/shadcn/ui/dropdown-menu';

import { IntegrateGitlabRevokeAlertDialog } from '../integrate-gitlab-alert-dialog';

export const IntegrateGitlabDropdown = () => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <IntegrateGitlabRevokeAlertDialog
          onCompelete={() => {
            setOpen(false);
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
