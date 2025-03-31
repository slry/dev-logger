import { icons as lucideIcons } from 'lucide-react';

export const RandomTeamIcon = () => {
  const icons = Object.values(lucideIcons);
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <div className="flex items-center justify-center rounded-md border bg-background">
      <RandomIcon width={24} height={24} />
    </div>
  );
};
