import { LayoutDashboard, Settings, Microchip, UserCog } from 'lucide-react';
import { z } from 'zod';

import { teamDTOSchema } from '@/entities/team-item/model';
import { snakeToCamelCase } from '@/shared/lib/snakeToCamelCase';

export const menuItems = [
  {
    name: 'Dashboard',
    logo: LayoutDashboard,
    url: '/dashboard',
  },
  {
    name: 'Integrations',
    logo: Microchip,
    url: '/integrations',
  },
  {
    name: 'API Settings',
    logo: Settings,
    url: '/api-settings',
  },
  {
    name: 'Team Settings',
    logo: UserCog,
    url: '/team-settings',
  },
];

export const currentTeamSchema = teamDTOSchema
  .extend({
    role: z.enum(['OWNER', 'DEVELOPER']),
  })
  .transform(snakeToCamelCase);

export type CurrentTeamSchema = z.infer<typeof currentTeamSchema>;

export const mapTeamRoleLabel = {
  OWNER: 'Owner',
  DEVELOPER: 'Developer',
} satisfies Record<CurrentTeamSchema['role'], string>;
