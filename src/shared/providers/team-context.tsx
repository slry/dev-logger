'use client';
import { createContext, FC, PropsWithChildren, useContext } from 'react';

export const TeamContext = createContext<string | null>(null);

export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeamContext must be used within a TeamProvider');
  }
  return context;
};

interface TeamProviderProps {
  teamId: string;
}

export const TeamProvider: FC<PropsWithChildren<TeamProviderProps>> = ({
  children,
  teamId,
}) => {
  return <TeamContext.Provider value={teamId}>{children}</TeamContext.Provider>;
};
