'use client';
import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';

import { Button } from '@/shared/shadcn/ui/button';

import { deleteAPIToken } from '../api';

interface DeleteApiTokenButtonProps {
  tokenId: number;
}

export const DeleteApiTokenButton: FC<DeleteApiTokenButtonProps> = ({ tokenId }) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    await deleteAPIToken(tokenId);
    await queryClient.invalidateQueries({
      queryKey: ['api-tokens-list'],
    });
  };

  return (
    <Button variant="red" onClick={handleDelete}>
      Delete
    </Button>
  );
};
