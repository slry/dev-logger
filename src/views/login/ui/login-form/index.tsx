'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/shadcn/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/shadcn/ui/form';
import { Input } from '@/shared/shadcn/ui/input';

import { login } from '../../api/actions';
import { loginSchema, LoginSchema } from '../../model';

export const LoginForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit = form.handleSubmit(async (data) => {
    const response = await login(data);
    if (response.type === 'success') {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      form.clearErrors();
      router.push('/');
    } else {
      form.setError('email', {
        type: 'server',
        message: response.message,
      });

      form.setError('password', {
        type: 'server',
        message: response.message,
      });
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={submit}
        className="flex w-[500px] flex-col gap-5 rounded-xl border p-10 shadow"
      >
        <h1 className="text-2xl">Login to your account</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button name="login" type="submit">
          Login
        </Button>
        <div className="flex justify-center gap-4">
          <span>Don&apos;t have an account?</span>
          <Link href="/signup" className="flex items-center gap-2">
            <span>Sign up</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </form>
    </Form>
  );
};
