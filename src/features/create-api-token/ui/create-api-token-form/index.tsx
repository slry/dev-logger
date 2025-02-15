'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';

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

import { createAPIToken } from '../../api';
import { createAPITokenSchema, CreateAPITokenSchema } from '../../model';
import { expiresAt } from '../../utils/expiresAt';

export const CreateAPITokenForm: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const form = useForm<CreateAPITokenSchema>({
    resolver: zodResolver(createAPITokenSchema),
    defaultValues: {
      name: '',
      expiration: '7',
    },
  });

  const submit = form.handleSubmit(async (data) => {
    await createAPIToken(data);
    await queryClient.invalidateQueries({
      queryKey: ['api-tokens-list'],
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={submit}>
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
                This token will expire after {expiresAt(Number(field.value))}.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>{children}</div>
      </form>
    </Form>
  );
};
