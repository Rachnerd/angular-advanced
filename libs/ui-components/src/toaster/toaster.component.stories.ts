import type { Meta, StoryObj } from '@storybook/angular';
import { ToasterComponent } from './toaster.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ToasterComponent> = {
  component: ToasterComponent,
  title: 'ToasterComponent',
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

// export const Heading: Story = {
//   args: {},
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/toaster works!/gi)).toBeTruthy();
//   },
// };
