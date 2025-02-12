import { KeyRound } from 'lucide-react';

import { CreateApiTokenButton } from '@/features/create-api-token/ui';

export const APITokenListEmpty = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <KeyRound width={24} height={24} />
      <h2 className="text-2xl font-semibold">No API Tokens created</h2>
      <p className="text-md font-medium text-gray-400">
        Need a token for extension? Create a new API Token to connect with account.
      </p>
      <CreateApiTokenButton />
    </section>
  );
};
