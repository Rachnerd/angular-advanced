import type { Meta, StoryObj } from '@storybook/angular';
import { DarkModeToggleComponent } from './dark-mode-toggle.component';

const meta: Meta<DarkModeToggleComponent> = {
  component: DarkModeToggleComponent,
  title: 'Features/DarkModeToggle',
};
export default meta;
type Story = StoryObj<DarkModeToggleComponent>;

export const Primary: Story = {
  args: {},
};
