import type { Meta, StoryObj } from '@storybook/angular';
import { RatingComponent } from './rating.component';

const meta: Meta<RatingComponent> = {
  component: RatingComponent,
  title: 'Atoms/Rating',
};
export default meta;
type Story = StoryObj<RatingComponent>;

export const Primary: Story = {
  args: {
    rating: 4.5,
    count: 12,
  },
};

export const Full: Story = {
  args: {
    rating: 5,
    count: 1000,
  },
};

export const Empty: Story = {
  args: {
    rating: 0,
    count: 0,
  },
};

export const Steps: Story = {
  args: {},
  render: () => ({
    /*html*/
    template: `
    <ui-rating rating="0" count="0"></ui-rating>
    <ui-rating rating="0.25" count="25"></ui-rating>
    <ui-rating rating="0.50" count="50"></ui-rating>
    <ui-rating rating="0.75" count="75"></ui-rating>
    <ui-rating rating="1" count="100"></ui-rating>
    `,
  }),
};
