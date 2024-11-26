import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  component: InputComponent,
  title: 'Atoms/Input',
};
export default meta;
type Story = StoryObj<InputComponent>;

export const Primary: Story = {
  args: {
    label: 'Enter your name:',
    formControlName: 'name',
  },
};

export const Error: Story = {
  args: {
    label: 'Enter your name:',
    hasError: true,
    errorMessage: 'Something went wrong.',
    formControlName: 'name',
  },
};

export const Required: Story = {
  args: {
    label: 'Name',
    required: true,
  },
};

export const Hint: Story = {
  args: {
    label: 'Enter your name:',
    hint: 'Hint: You have a name!',
  },
};

export const LeadingIcon: Story = {
  args: {
    label: 'Phone number:',
    type: 'tel',
  },
  render: ({ label }) => ({
    /*html*/
    template: `<ui-input formControlName="phone" label="${label}" leadingIcon="true"><span leadingIcon>📞</span></ui-input>`,
  }),
};

export const TrailingIcon: Story = {
  args: {
    label: 'Phone number:',
    type: 'tel',
  },
  render: ({ label }) => ({
    /*html*/
    template: `<ui-input formControlName="phone"  label="${label}" trailingIcon="true"><span trailingIcon>📞</span></ui-input>`,
  }),
};
