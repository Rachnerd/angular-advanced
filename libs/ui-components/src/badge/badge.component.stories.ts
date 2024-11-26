import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  component: BadgeComponent,
  title: 'Atoms/Badge',
};
export default meta;
type Story = StoryObj<BadgeComponent & { label: string }>;

export const Primary: Story = {
  args: {
    label: 'Electronics',
  },
  render: ({ label }) => ({
    /*html*/
    template: `<ui-badge>${label}</ui-badge>`,
  }),
};

export const Secondary: Story = {
  args: {
    label: 'Electronics',
  },
  render: ({ label }) => ({
    /*html*/
    template: `<ui-badge variant="secondary">${label}</ui-badge>`,
  }),
};

export const Neutral: Story = {
  args: {
    label: 'Electronics',
  },
  render: ({ label }) => ({
    /*html*/
    template: `<ui-badge variant="neutral">${label}</ui-badge>`,
  }),
};
