import type { Meta, StoryObj } from '@storybook/angular';
import { ThumbnailComponent } from './thumbnail.component';

const meta: Meta<ThumbnailComponent> = {
  component: ThumbnailComponent,
  title: 'Atoms/Thumbnail',
};
export default meta;
type Story = StoryObj<ThumbnailComponent>;

export const Primary: Story = {
  args: {
    src: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    alt: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  },
};

export const Landscape: Story = {
  args: {
    src: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
    alt: 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
  },
};
