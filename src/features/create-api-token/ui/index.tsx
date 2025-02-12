'use client';

import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/shared/shadcn/ui/button';

import { createAPIToken } from '../api';

export const CreateApiTokenButton = () => {
  const queryClient = useQueryClient();

  const handleCreate = async () => {
    await createAPIToken();
    await queryClient.invalidateQueries({
      queryKey: ['api-tokens-list'],
    });
  };

  return (
    <Button variant="green" onClick={handleCreate}>
      Create New Token
    </Button>
  );
};
