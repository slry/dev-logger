import { FC } from 'react';

import { APITokenItem } from '@/entities/api-token-item/model';
import { DeleteApiTokenButton } from '@/features/delete-api-token/ui';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/shadcn/ui/alert-dialog';

export const APITokenListItem: FC<APITokenItem> = ({ id, name, partialKey }) => {
  return (
    <tr className="w-full border-b last:border-b-0">
      <td className="max-w-[200px] truncate p-2">{name}</td>
      <td className="p-2">
        <div className="flex gap-1 text-sm">
          <span>{partialKey}</span>
          <span className="select-none blurred-text">g4-bkf3-324k-fovm3-b4vmf594</span>
        </div>
      </td>
      <td className="p-2">
        <AlertDialog>
          <AlertDialogTrigger>Delete</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure that you want to delete this API Token?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the{' '}
                <span className="whitespace-nowrap font-extrabold">{name}</span> API
                Token.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction asChild>
                <DeleteApiTokenButton tokenId={id} />
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </td>
    </tr>
  );
};
