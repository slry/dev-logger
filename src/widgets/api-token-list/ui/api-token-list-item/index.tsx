import { FC } from 'react';

import { APITokenItem } from '@/entities/api-token-item/model';
import { DeleteApiTokenButton } from '@/features/delete-api-token/ui';

export const APITokenListItem: FC<APITokenItem> = ({
  id,
  name,
  partialKey,
  expiresAt,
}) => {
  return (
    <tr className="w-full border-b last:border-b-0">
      <td className="max-w-[200px] truncate p-4">{name}</td>
      <td className="p-4">
        <div className="flex gap-1 text-sm">
          <span>{partialKey}</span>
          <span className="select-none blurred-text">g4-bkf3-324k-fovm3-b4vmf594</span>
        </div>
      </td>
      <td className="p-4">{expiresAt}</td>
      <td className="p-4">
        <DeleteApiTokenButton tokenName={name} tokenId={id} />
      </td>
    </tr>
  );
};
