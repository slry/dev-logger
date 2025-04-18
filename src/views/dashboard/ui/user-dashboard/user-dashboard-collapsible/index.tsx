'use client';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';

import { TeamMemberSchema } from '@/entities/team/model';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/shadcn/ui/collapsible';

export const UserDashboardCollapsible: FC<PropsWithChildren<TeamMemberSchema>> = ({
  name,
  surname,
  children,
}) => {
  const [open, setOpen] = useState(true);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h2>
          {name} {surname}&apos;s Dashboard
        </h2>
        <CollapsibleTrigger>
          {open ? (
            <ChevronUpIcon className="size-4" />
          ) : (
            <ChevronDownIcon className="size-4" />
          )}
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="w-full space-y-4">{children}</CollapsibleContent>
    </Collapsible>
  );
};
