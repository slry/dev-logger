import { usePathname, useRouter } from 'next/navigation';

export const useChangeTeam = () => {
  const pathname = usePathname();
  const router = useRouter();

  const changeTeam = (teamId: string) => {
    const newPathname = pathname.replace(/team\/[^/]+/, `team/${teamId}`);
    router.push(newPathname);
  };

  return {
    changeTeam,
  };
};
