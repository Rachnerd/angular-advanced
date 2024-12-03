import type { Meta, StoryObj } from '@storybook/angular';
import { CartEntryComponent } from './cart-entry.component';
import { PRODUCT_CARD_MOCK } from '../product-card/mocks/product-card.mock';

const meta: Meta<CartEntryComponent> = {
  component: CartEntryComponent,
  title: 'Molecules/CartEntry',
};
export default meta;
type Story = StoryObj<CartEntryComponent>;

export const Primary: Story = {
  args: {
    entry: {
      quantity: 3,
      total: 3,
    },
    product: {
      ...PRODUCT_CARD_MOCK,
      id: '1',
      type: 'default',
    },
  },
};
