'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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

import { login, signup } from '../../api';
import { loginSchema, LoginSchema, nativeEventSchema } from '../../model';

export const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submitters = {
    login: login,
    signup: signup,
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const typedNativeEvent = nativeEventSchema.parse(e.nativeEvent);

    const submitter = submitters[typedNativeEvent.submitter.name];

    form.handleSubmit(submitter)();
  };
  return (
    <Form {...form}>
      <form onSubmit={submit} className="flex w-[400px] flex-col gap-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <Button name="login" type="submit">
            Login
          </Button>
          <Button name="signup" type="submit">
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
};
