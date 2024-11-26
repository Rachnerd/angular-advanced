import type { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

const meta: Meta<PaginationComponent> = {
  component: PaginationComponent,
  title: 'Atoms/Pagination',
  argTypes: {
    pageChange: { action: 'pageChange' },
  },
};
export default meta;
type Story = StoryObj<PaginationComponent>;

export const Primary: Story = {
  args: {
    currentPage: 1,
    hasNextPage: true,
    hasPrevPage: false,
    totalPages: 10,
  },
};
