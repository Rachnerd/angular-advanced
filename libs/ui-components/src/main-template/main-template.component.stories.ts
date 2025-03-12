import type { Meta, StoryObj } from '@storybook/angular';
import { MainTemplateComponent } from './main-template.component';

const meta: Meta<MainTemplateComponent> = {
  component: MainTemplateComponent,
  title: 'Templates/Main',
};
export default meta;
type Story = StoryObj<MainTemplateComponent>;

export const Primary: Story = {
  args: {},
  render: () => ({
    /*html*/
    template: `
    <ui-main-template>
      <section main>Main</section>
    </ui-main-template>`,
  }),
};
