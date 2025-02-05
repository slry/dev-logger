'use client';
import { useQuery } from '@tanstack/react-query';
import { createContext, FC, PropsWithChildren } from 'react';
import { z } from 'zod';

import { createClient } from '../api/supabase/client';

interface AuthContextValue {
  name: string;
  surname: string;
  email: string;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const supabase = createClient();

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => supabase.auth.getUser(),
  });

  if (isLoading || data?.error)
    return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;

  const user = data?.data.user;

  const parsedUser = z
    .object({
      name: z.string(),
      surname: z.string(),
      email: z.string(),
    })
    .safeParse(user?.user_metadata);

  if (!parsedUser.success)
    throw new Error('Failed to parse user data:', parsedUser.error);

  const { name, surname, email } = parsedUser.data;

  return (
    <AuthContext.Provider
      value={{
        name,
        surname,
        email,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
