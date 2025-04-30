import { FC } from 'react';

import { APITokenItem } from '@/entities/api-token-item/model';
import { DeleteApiTokenDialog } from '@/features/delete-api-token/ui';
import { TableCell, TableRow } from '@/shared/ui/table';

export const APITokenListItem: FC<APITokenItem> = ({
  id,
  name,
  partialKey,
  expiresAt,
}) => {
  return (
    <TableRow className="last:border-b-0">
      <TableCell className="max-w-[200px] truncate">{name}</TableCell>
      <TableCell>
        <div className="flex gap-1 text-sm">
          <span>{partialKey}</span>
          <span className="select-none blurred-text">g4-bkf3-324k-fovm3-b4vmf594</span>
        </div>
      </TableCell>
      <TableCell>{expiresAt}</TableCell>
      <TableCell>
        <DeleteApiTokenDialog tokenName={name} tokenId={id} />
      </TableCell>
    </TableRow>
  );
};
