import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  LayoutDashboard,
  Settings,
  Microchip,
} from 'lucide-react';

export const mockTeams = [
  {
    name: 'Acme Inc',
    logo: GalleryVerticalEnd,
    plan: 'Enterprise',
  },
  {
    name: 'Acme Corp.',
    logo: AudioWaveform,
    plan: 'Startup',
  },
  {
    name: 'Evil Corp.',
    logo: Command,
    plan: 'Free',
  },
];

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
];
