import type { Meta, StoryObj } from '@storybook/angular';
import { PaginationControlsComponent } from './pagination-controls.component';

const meta: Meta<PaginationControlsComponent> = {
  component: PaginationControlsComponent,
  title: 'Atoms/PaginationControls',
  argTypes: {
    sortChange: { action: 'sortChange' },
    orderChange: { action: 'orderChange' },
    pageSizeChange: { action: 'pageSizeChange' },
  },
};
export default meta;
type Story = StoryObj<PaginationControlsComponent>;

export const Primary: Story = {
  args: {
    currentOrder: 'asc',
    currentPageSize: 10,
    currentSort: 'id',
    pageSizes: [10, 2],
    sortOptions: [
      {
        value: 'id',
        label: 'Id',
      },
      {
        value: 'price',
        label: 'Price',
      },
    ],
  },
};
