import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  component: CheckboxComponent,
  title: 'Atoms/Checkbox',
};
export default meta;
type Story = StoryObj<CheckboxComponent & { label: string }>;

export const Primary: Story = {
  args: {
    label: 'Are you sure?',
  },
  render: ({ label }) => ({
    template: `
    <ui-checkbox>${label}</ui-checkbox>`,
  }),
};

export const Enabled: Story = {
  args: {
    label: 'Are you sure?',
    checked: true,
  },
  render: ({ label }) => ({
    template: `
    <ui-checkbox checked="true">${label}</ui-checkbox>`,
  }),
};

export const Disabled: Story = {
  args: {
    // label: 'Are you sure?',
    disabled: true,
  },
};
