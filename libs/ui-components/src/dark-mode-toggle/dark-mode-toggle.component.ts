import { Component, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

const THEME_ATTRIBUTE = 'data-theme';
const DARK_THEME = 'dark';

@Component({
  selector: 'ui-dark-mode-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.scss',
})
export class DarkModeToggleComponent {
  private document = inject(DOCUMENT);

  protected darkMode = signal(this.isDarkMode());

  isDarkMode() {
    return this.document.body.getAttribute(THEME_ATTRIBUTE) === DARK_THEME;
  }

  toggleTheme() {
    const isDarkMode = this.isDarkMode();
    this.updateTheme(isDarkMode);
    console.log(isDarkMode);
    this.darkMode.set(!isDarkMode);
  }

  private updateTheme(isDarkMode: boolean) {
    const { body } = this.document;
    if (isDarkMode) {
      body.removeAttribute(THEME_ATTRIBUTE);
      return;
    }
    body.setAttribute(THEME_ATTRIBUTE, DARK_THEME);
  }
}
