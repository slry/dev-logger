import { LayoutDashboard, Settings, Microchip, UserCog } from 'lucide-react';

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
