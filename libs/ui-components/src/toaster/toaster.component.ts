import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'default';
  removing: boolean;
}

@Component({
  selector: 'ui-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
})
export class ToasterComponent {
  toasts = input.required<Toast[]>();
}
