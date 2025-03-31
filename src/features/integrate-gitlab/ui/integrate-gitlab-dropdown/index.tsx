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

  const onComplete = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon width={16} height={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <IntegrateGitlabRevokeAlertDialog onCompelete={onComplete} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
