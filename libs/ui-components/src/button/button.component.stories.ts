import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { withActions } from '@storybook/addon-actions/decorator';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'Atoms/Button',
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  decorators: [withActions],
};
export default meta;
type Story = StoryObj<ButtonComponent & { label: string }>;

export const Primary: Story = {
  args: {
    label: 'Click me',
  },
  render: ({ label }) => ({
    /*html*/
    template: `
    <ui-button>${label}</ui-button><br />
    <ui-button loading="true">${label}</ui-button><br />
    <ui-button disabled="true" disabledMessage="Nope">${label}</ui-button><br />
    `,
  }),
};

export const Secondary: Story = {
  args: {
    label: 'Click me',
  },
  render: ({ label }) => ({
    /*html*/
    template: `
    <ui-button variant="secondary">${label}</ui-button><br />
    <ui-button variant="secondary" loading="true">${label}</ui-button><br />
    <ui-button variant="secondary" disabled="true" disabledMessage="Nope">${label}</ui-button><br />
    `,
  }),
};

export const Outline: Story = {
  args: {
    label: 'Click me',
  },
  render: ({ label }) => ({
    /*html*/
    template: `
    <ui-button variant="outline">${label}</ui-button><br />
    <ui-button variant="outline" loading="true">${label}</ui-button><br />
    <ui-button variant="outline" disabled="true" disabledMessage="Nope">${label} </ui-button><br />
    `,
  }),
};
