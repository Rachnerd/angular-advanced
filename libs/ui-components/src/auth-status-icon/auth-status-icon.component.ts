import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-auth-status-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-status-icon.component.html',
  styleUrl: './auth-status-icon.component.scss',
})
export class AuthStatusIconComponent {
  isAuthenticated = input.required<boolean>();
}
