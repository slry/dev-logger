import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';

import { LoginPage } from '.';
import { login } from '../api/mock';

const meta: Meta<typeof LoginPage> = {
  component: LoginPage,
};

export default meta;

type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {};

export const Login: Story = {
  beforeEach: () => {
    login.mockResolvedValue({
      type: 'success',
      message: 'Logged in successfully',
    });
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Fill in the form', async () => {
      const emailInput = canvas.getByLabelText('Email');
      const passwordInput = canvas.getByLabelText('Password');

      await userEvent.type(emailInput, 'john.doe@example.com');
      await userEvent.type(passwordInput, 'password');
    });

    await step('Submit form', async () => {
      const btn = await canvas.findByRole('button', { name: 'Login' });
      await userEvent.click(btn);

      expect(login).toHaveBeenCalled();
    });
  },
};

export const LoginError: Story = {
  beforeEach: () => {
    login.mockResolvedValue({
      type: 'error',
      message: 'Login failed',
    });
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Fill in the form', async () => {
      const emailInput = canvas.getByLabelText('Email');
      const passwordInput = canvas.getByLabelText('Password');

      await userEvent.type(emailInput, 'john.doe@example.com');
      await userEvent.type(passwordInput, 'password');
    });

    await step('Submit form', async () => {
      const btn = await canvas.findByRole('button', { name: 'Login' });
      await userEvent.click(btn);

      expect(login).toHaveBeenCalled();

      await canvas.findAllByText('Login failed');
    });
  },
};
