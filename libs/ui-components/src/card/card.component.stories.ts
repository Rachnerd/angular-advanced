import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  component: CardComponent,
  title: 'Atoms/Card',
};
export default meta;
type Story = StoryObj<CardComponent>;

export const Primary: Story = {
  args: {},
  render: () => ({
    /*html*/
    template: `
    <ui-card>
      <span>Hello</span>
    </ui-card>`,
  }),
};
