import type { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  title: 'Templates/Header',
};
export default meta;
type Story = StoryObj<HeaderComponent>;

export const Primary: Story = {
  args: {},
  render: () => ({
    template: `<ui-header>
  <section logo>Logo</section>
    <nav slot="navigation">
      <ul>
        <li><a href="#home">Link 1</a></li>
        <li><a href="#products">Link 2</a></li>
      </ul>
    </nav>
    <section actions>Actions</section>
</ui-header>`,
  }),
};
