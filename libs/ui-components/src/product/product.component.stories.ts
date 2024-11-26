import type { Meta, StoryObj } from '@storybook/angular';
import { ProductComponent } from './product.component';
import { PRODUCT_CARD_MOCK } from '../product-card/mocks/product-card.mock';

const meta: Meta<ProductComponent> = {
  component: ProductComponent,
  title: 'Molecules/Product',
};
export default meta;

type Story = StoryObj<ProductComponent>;

const PRODUCT_DATA: ReturnType<ProductComponent['product']> = {
  ...PRODUCT_CARD_MOCK,
  type: 'default',
};

export const Primary: Story = {
  args: {
    product: PRODUCT_DATA,
  },
};

export const Limited: Story = {
  args: {
    product: {
      ...PRODUCT_DATA,
      type: 'limited',
    },
  },
};

export const OutOfStock: Story = {
  args: {
    product: {
      ...PRODUCT_DATA,
      type: 'out-of-stock',
    },
  },
};
