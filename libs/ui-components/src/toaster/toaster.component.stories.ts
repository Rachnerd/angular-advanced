import type { Meta, StoryObj } from '@storybook/angular';
import { ToasterComponent } from './toaster.component';

const meta: Meta<ToasterComponent> = {
  component: ToasterComponent,
  title: 'Molecules/Toaster',
};
export default meta;
type Story = StoryObj<ToasterComponent>;

export const Primary: Story = {
  args: {
    toasts: [
      {
        id: '1',
        message: 'Default',
        type: 'default',
        removing: false,
      },
      {
        id: '2',
        message: 'Success',
        type: 'success',
        removing: false,
      },
      {
        id: '2',
        message: 'Warning',
        type: 'warning',
        removing: false,
      },
      {
        id: '2',
        message: 'Error',
        type: 'error',
        removing: false,
      },
    ],
  },
};
