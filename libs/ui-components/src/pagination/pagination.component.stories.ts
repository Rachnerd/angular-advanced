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

export const SmallContainer: Story = {
  args: {
    currentPage: 1,
    hasNextPage: true,
    hasPrevPage: false,
    totalPages: 10,
  },
  render: ({ totalPages, currentPage, hasPrevPage, hasNextPage }) => ({
    template: `
<style>
ui-pagination {
width: 100px;
}
</style>
<ui-pagination [currentPage]="${currentPage}" [hasNextPage]="${hasNextPage}" [hasPrevPage]="${hasPrevPage}" [totalPages]="${totalPages}">
</ui-pagination>
    `,
  }),
};
