'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/shadcn/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/shadcn/ui/form';
import { PasswordInput } from '@/shared/shadcn/ui/input';

import { integrateGitlabToken } from '../../api';
import { isGitlabIntegratedQueryOptions } from '../../api/queryOptions';
import { integrateGitlabSchema } from '../../model';

export const IntegrateGitlabForm = () => {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(integrateGitlabSchema),
    defaultValues: {
      token: '',
    },
  });

  const formSubmit = form.handleSubmit(async (data) => {
    try {
      await integrateGitlabToken(data.token);
      queryClient.invalidateQueries(isGitlabIntegratedQueryOptions);
    } catch {
      form.setError('root', {
        type: 'manual',
        message: 'Invalid token',
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={formSubmit} className="flex gap-4">
        <FormField
          control={form.control}
          name="token"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="w-full">
              <FormControl>
                <PasswordInput placeholder="Gitlab Token" {...field} />
              </FormControl>
              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button variant="outline" loading={form.formState.isSubmitting} type="submit">
          Integrate
        </Button>
      </form>
    </Form>
  );
};
