import type { Meta, StoryObj } from '@storybook/angular';
import { GridComponent } from './grid.component';

const meta: Meta<GridComponent> = {
  component: GridComponent,
  title: 'Atoms/Grid',
};
export default meta;
type Story = StoryObj<GridComponent>;

const GRID_ITEM_STYLE = `
 .grid-item {
  height: 200px;
  background: #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}`;

export const Primary: Story = {
  args: {},
  render: () => ({
    template: `
    <style>
    ${GRID_ITEM_STYLE}
    </style>
    <ui-grid>
      <div class="grid-item">Item 1</div>
      <div class="grid-item">Item 2</div>
      <div class="grid-item">Item 3</div>
      <div class="grid-item">Item 4</div>
      <div class="grid-item">Item 5</div>
      <div class="grid-item">Item 6</div>
      <div class="grid-item">Item 7</div>
      <div class="grid-item">Item 8</div>
    </ui-grid>`,
  }),
};

export const CustomWidth200: Story = {
  args: {},
  render: () => ({
    template: `
    <style>
      ${GRID_ITEM_STYLE}
      ui-grid {
        --grid-item-width: 200px;
      }
    </style>
    <ui-grid>
      <div class="grid-item">Item 1</div>
      <div class="grid-item">Item 2</div>
      <div class="grid-item">Item 3</div>
      <div class="grid-item">Item 4</div>
      <div class="grid-item">Item 5</div>
      <div class="grid-item">Item 6</div>
      <div class="grid-item">Item 7</div>
      <div class="grid-item">Item 8</div>
    </ui-grid>`,
  }),
};
