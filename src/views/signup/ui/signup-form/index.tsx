'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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

import { signup } from '../../api';
import { signupSchema, SignupSchema } from '../../model';

export const SignupForm = () => {
  const router = useRouter();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
  });

  const submit = form.handleSubmit(async (data) => {
    const response = await signup(data);

    if (response.type === 'success') {
      form.clearErrors();
      router.push('/');
    } else {
      form.setError('email', {
        type: 'manual',
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
        <h1 className="text-2xl">Sign up to your account</h1>
        <div className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Enter surname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
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
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button name="login" type="submit">
          Sign up
        </Button>
        <div className="flex justify-center gap-4">
          <span>Already have an account?</span>
          <Link href="/login" className="flex items-center gap-2">
            Login <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </form>
    </Form>
  );
};
