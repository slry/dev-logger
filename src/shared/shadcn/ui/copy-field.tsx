'use client';
import { ClipboardCopy } from 'lucide-react';
import { FC, useState } from 'react';

import { Button } from './button';

interface CopyFieldProps {
  value: string;
}

export const CopyField: FC<CopyFieldProps> = ({ value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(value);
    setIsCopied(true);
  };

  return (
    <div className="flex h-[54px] w-full items-center justify-between gap-2 rounded-lg border p-2">
      <input
        className="w-full bg-transparent outline-0"
        type="text"
        value={value}
        readOnly
      />
      {!isCopied && (
        <Button onClick={handleCopy} variant="ghost">
          <ClipboardCopy size={4} />
        </Button>
      )}
      {isCopied && <span>Copied!</span>}
    </div>
  );
};
