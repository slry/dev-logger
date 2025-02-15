import { DialogTitle } from '@radix-ui/react-dialog';

import { Button } from '@/shared/shadcn/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/shared/shadcn/ui/dialog';

import { CreateAPITokenForm } from './create-api-token-form';

export const CreateAPIToken = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="green">Create API Token</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate New API Token</DialogTitle>
          <DialogDescription className="hidden">
            This form generates new API Token
          </DialogDescription>
        </DialogHeader>
        <CreateAPITokenForm>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </CreateAPITokenForm>
      </DialogContent>
    </Dialog>
  );
};
