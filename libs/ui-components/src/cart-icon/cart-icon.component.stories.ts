import type { Meta, StoryObj } from '@storybook/angular';
import { CartIconComponent } from './cart-icon.component';

const meta: Meta<CartIconComponent> = {
  component: CartIconComponent,
  title: 'Atoms/CartIcon',
};
export default meta;
type Story = StoryObj<CartIconComponent>;

export const Primary: Story = {
  args: {
    count: 2,
  },
};

export const Empty: Story = {
  args: {
    count: 0,
  },
};
