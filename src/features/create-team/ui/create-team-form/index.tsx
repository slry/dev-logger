'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { icons as lucideIcons } from 'lucide-react';
import { FC } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useChangeTeam } from '@/shared/hooks/useChangeTeam';
import { Button } from '@/shared/shadcn/ui/button';
import { DialogFooter } from '@/shared/shadcn/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/shadcn/ui/form';
import { Input } from '@/shared/shadcn/ui/input';
import { getTeamsListQueryOptions } from '@/widgets/app-sidebar/api/queryKeys';

import { createTeam } from '../../api';
import { createTeamSchema, CreateTeamSchema } from '../../model';

interface CreateTeamFormProps {
  onComplete?: () => void;
}

export const CreateTeamForm: FC<CreateTeamFormProps> = ({ onComplete }) => {
  const icons = Object.values(lucideIcons);
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
  const queryClient = useQueryClient();
  const { changeTeam } = useChangeTeam();
  const form = useForm<CreateTeamSchema>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: '',
    },
  });

  const [currentTeamName] = useWatch({
    control: form.control,
    name: ['name'],
  });

  const submit = form.handleSubmit(async ({ name }) => {
    if (!RandomIcon.displayName) {
      console.error('Icon does not have a display name');
      return;
    }

    const data = await createTeam(name, RandomIcon.displayName);

    if (data) {
      queryClient.invalidateQueries(getTeamsListQueryOptions);
      changeTeam(data.id);
      onComplete?.();
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="flex justify-center">
          <div className="flex items-center gap-2 rounded-md border p-2">
            <div className="flex size-6 items-center justify-center rounded-sm border">
              <RandomIcon className="size-4 shrink-0" />
            </div>
            <p>{currentTeamName || 'Your Team'}</p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input {...field} maxLength={30} />
              </FormControl>
              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button loading={form.formState.isSubmitting} type="submit">
            Create Team
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
