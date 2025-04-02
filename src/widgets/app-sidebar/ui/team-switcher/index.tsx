'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronsUpDown, icons as lucideIcons } from 'lucide-react';
import { FC, useState } from 'react';

import { TeamItem } from '@/entities/team-item/ui';
import { CreateTeamDialog } from '@/features/create-team/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/shadcn/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/shadcn/ui/sidebar';

import {
  getCurrentTeamQueryOptions,
  getPersonalTeamIdQueryOptions,
  getTeamsListQueryOptions,
} from '../../api/queryKeys';
import { mapTeamRoleLabel } from '../../model';

interface TeamSwitcherProps {
  teamId: string;
}

export const TeamSwitcher: FC<TeamSwitcherProps> = ({ teamId }) => {
  const { isMobile } = useSidebar();
  const [open, setOpen] = useState(false);

  const { data: teams } = useQuery(getTeamsListQueryOptions);
  const { data: personalTeamId } = useQuery(getPersonalTeamIdQueryOptions);
  const { data: currentTeam } = useQuery(getCurrentTeamQueryOptions(teamId));

  if (!teams) return null;
  if (!currentTeam) return null;
  if (!personalTeamId) return null;

  const teamsList = teams
    .filter((team) => team.id !== teamId)
    .filter((team) => (teamId === 'personal' ? team.id !== personalTeamId : true))
    .map((team) => ({
      teamId: team.id,
      name: team.name || 'No name',
      personal: team.id === personalTeamId,
      Icon: lucideIcons[team.icon as keyof typeof lucideIcons] || lucideIcons['Cat'],
    }));

  const CurrentTeamIcon =
    lucideIcons[currentTeam.icon as keyof typeof lucideIcons] || lucideIcons['Cat'];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <CurrentTeamIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{currentTeam.name}</span>
                <span className="truncate text-xs">
                  {mapTeamRoleLabel[currentTeam.role]}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teamsList.map((team) => (
              <DropdownMenuItem key={team.name} asChild>
                <TeamItem {...team} />
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <CreateTeamDialog />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
