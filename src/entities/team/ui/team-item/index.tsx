'use client';

import { icons } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

type IconsKeys = keyof typeof icons;

type IconType = (typeof icons)[IconsKeys];

interface TeamItemProps {
  teamId: string;
  name: string;
  personal: boolean;
  Icon: IconType;
}

export const TeamItem: FC<TeamItemProps> = ({ teamId, name, personal, Icon }) => {
  const path = usePathname();
  const newPath = personal
    ? path.replace(/\/team\/[^/]+/, `/team/personal`)
    : path.replace(/\/team\/[^/]+/, `/team/${teamId}`);
  return (
    <Link
      href={newPath}
      className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm p-2 px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent/50 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
    >
      <div className="flex size-6 items-center justify-center rounded-sm border">
        <Icon className="size-4 shrink-0" />
      </div>
      {name}
    </Link>
  );
};
