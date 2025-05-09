import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { SignupPage } from '.';
import { signup } from '../api/mock';

const meta: Meta<typeof SignupPage> = {
  component: SignupPage,
};

export default meta;

type Story = StoryObj<typeof SignupPage>;

export const Default: Story = {};

export const Signup: Story = {
  beforeEach: () => {
    signup.mockResolvedValue({
      type: 'success',
      message: 'Account created successfully',
    });
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Fill in the form', async () => {
      const nameInput = canvas.getByLabelText('Name');
      const surnameInput = canvas.getByLabelText('Surname');
      const emailInput = canvas.getByLabelText('Email');
      const passwordInput = canvas.getByLabelText('Password');

      await userEvent.type(nameInput, 'John');
      await userEvent.type(surnameInput, 'Doe');
      await userEvent.type(emailInput, 'john.doe@example.com');
      await userEvent.type(passwordInput, 'password');
    });

    await step('Submit form', async () => {
      const btn = await canvas.findByRole('button', { name: 'Sign up' });
      await userEvent.click(btn);

      expect(signup).toHaveBeenCalled();
    });
  },
};

export const SignupError: Story = {
  beforeEach: () => {
    signup.mockResolvedValue({
      type: 'error',
      message: 'Account creation failed',
    });
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Fill in the form', async () => {
      const nameInput = canvas.getByLabelText('Name');
      const surnameInput = canvas.getByLabelText('Surname');
      const emailInput = canvas.getByLabelText('Email');
      const passwordInput = canvas.getByLabelText('Password');

      await userEvent.type(nameInput, 'John');
      await userEvent.type(surnameInput, 'Doe');
      await userEvent.type(emailInput, 'john.doe@example.com');
      await userEvent.type(passwordInput, 'password');
    });

    await step('Submit form', async () => {
      const btn = await canvas.findByRole('button', { name: 'Sign up' });
      await userEvent.click(btn);

      expect(signup).toHaveBeenCalled();

      await canvas.findByText('Account creation failed');
    });
  },
};
