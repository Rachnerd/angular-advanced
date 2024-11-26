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
      <section logo>Logo</section>
      <nav slot="navigation">
        <ul>
          <li><a href="#home">Link 1</a></li>
          <li><a href="#products">Link 2</a></li>
        </ul>
      </nav>
      <section actions>Actions</section>
      <section hero>Hero</section>
      <section main>Main</section>
    </ui-main-template>`,
  }),
};
