'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLoadingHandleClick } from '@/shared/hooks/useLoadingHandleClick';
import { Button } from '@/shared/shadcn/ui/button';
import { CopyField } from '@/shared/shadcn/ui/copy-field';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/shadcn/ui/form';
import { Input } from '@/shared/shadcn/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/shadcn/ui/select';

import { createAPIToken } from '../../api/actions';
import { createAPITokenSchema, CreateAPITokenSchema } from '../../model';
import { expiresAtLocale } from '../../utils/expiresAtLocale';

interface CreateAPITokenFormProps {
  onComplete: () => Promise<void>;
  teamId: string;
}

export const CreateAPITokenForm: FC<CreateAPITokenFormProps> = ({
  onComplete,
  teamId,
}) => {
  const [newKey, setNewKey] = useState<string | null>(null);
  const form = useForm<CreateAPITokenSchema>({
    resolver: zodResolver(createAPITokenSchema),
    defaultValues: {
      name: '',
      expiration: '7',
    },
  });

  const submit = form.handleSubmit(async (data) => {
    try {
      const newKey = await createAPIToken(data, teamId);
      setNewKey(newKey);
    } catch (error) {
      console.error('Error creating API token:', error);
    }
  });

  const { loading: dialogCloseLoading, handleClick: onDialogClose } =
    useLoadingHandleClick(onComplete);

  if (newKey) {
    return (
      <div className="flex flex-col gap-4">
        <CopyField value={newKey} />
        <div className="flex justify-end">
          <Button loading={dialogCloseLoading} onClick={onDialogClose}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={submit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                A unique name for this token. May be visible to owners or users with
                possession of the token.
              </FormDescription>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This token will expire after {expiresAtLocale(Number(field.value))}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button loading={form.formState.isSubmitting} variant="green" type="submit">
            Generate API Token
          </Button>
        </div>
      </form>
    </Form>
  );
};
