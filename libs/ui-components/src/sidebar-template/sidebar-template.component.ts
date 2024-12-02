import { Component, signal } from '@angular/core';

@Component({
  selector: 'ui-sidebar-template',
  standalone: true,
  templateUrl: './sidebar-template.component.html',
  styleUrl: './sidebar-template.component.scss',
})
export class SidebarTemplateComponent {
  protected sidebar = signal(false);

  toggleSideBar() {
    const open = this.sidebar();
    this.sidebar.set(!open);
  }
}
