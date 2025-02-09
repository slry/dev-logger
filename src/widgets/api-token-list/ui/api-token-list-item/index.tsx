import { FC } from 'react';

import { APITokenItem } from '@/entities/api-token-item/model';
import { DeleteApiTokenButton } from '@/features/delete-api-token/ui';

export const APITokenListItem: FC<APITokenItem> = ({ id, name, partialKey }) => {
  return (
    <div className="flex w-full items-center justify-between border-b p-2 last:border-b-0">
      <div className="flex w-full items-center gap-4">
        <span className="w-52 truncate">{name}</span>
        <span>
          {partialKey}
          &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
        </span>
      </div>
      <DeleteApiTokenButton tokenId={id} />
    </div>
  );
};
