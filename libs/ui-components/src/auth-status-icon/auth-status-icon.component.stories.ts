import type { Meta, StoryObj } from '@storybook/angular';
import { AuthStatusIconComponent } from './auth-status-icon.component';

const meta: Meta<AuthStatusIconComponent> = {
  component: AuthStatusIconComponent,
  title: 'Features/AuthStatusIcon',
};
export default meta;
type Story = StoryObj<AuthStatusIconComponent>;

export const Primary: Story = {
  args: {
    isAuthenticated: true,
  },
};

export const Unauthenticated: Story = {
  args: {
    isAuthenticated: false,
  },
};
