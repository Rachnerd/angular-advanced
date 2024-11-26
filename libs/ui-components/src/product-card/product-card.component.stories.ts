import type { Meta, StoryObj } from '@storybook/angular';
import { ProductCardComponent } from './product-card.component';
import { PRODUCT_CARD_MOCK } from './mocks/product-card.mock';

const meta: Meta<ProductCardComponent> = {
  component: ProductCardComponent,
  title: 'Molecules/ProductCard',
};
export default meta;
type Story = StoryObj<ProductCardComponent>;

export const Primary: Story = {
  args: {
    product: PRODUCT_CARD_MOCK,
  },
};
