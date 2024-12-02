import type { Meta, StoryObj } from '@storybook/angular';
import { SidebarTemplateComponent } from './sidebar-template.component';

const meta: Meta<SidebarTemplateComponent> = {
  component: SidebarTemplateComponent,
  title: 'Templates/Sidebar',
};
export default meta;
type Story = StoryObj<SidebarTemplateComponent>;

export const Primary: Story = {
  args: {},
  render: () => ({
    /*html*/
    template: `
    <ui-sidebar-template>
      <section logo>Logo</section>
      <nav slot="navigation">
        <ul>
          <li><a href="#home">Link 1</a></li>
          <li><a href="#products">Link 2</a></li>
        </ul>
      </nav>
      <section actions>Actions</section>
      <section hero>Hero</section>
      <section sidebar></section>
      <section main>Main</section>
    </ui-sidebar-template>`,
  }),
};
