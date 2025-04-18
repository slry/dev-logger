'use client';
import { createContext, FC, PropsWithChildren, use } from 'react';

interface UserDashboardContextValue {
  userId: string;
}

const UserDashboardContext = createContext<UserDashboardContextValue | null>(null);

export const UserDashboardProvider: FC<PropsWithChildren<UserDashboardContextValue>> = ({
  children,
  ...contextValue
}) => {
  return (
    <UserDashboardContext.Provider value={contextValue}>
      {children}
    </UserDashboardContext.Provider>
  );
};

export const useUserDashboardContext = () => {
  const context = use(UserDashboardContext);
  if (!context) {
    throw new Error(
      'useUserDashboardContext must be used within a UserDashboardProvider',
    );
  }
  return context;
};
