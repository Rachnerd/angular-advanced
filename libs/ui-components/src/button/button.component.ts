import {
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit, OnDestroy {
  variant = input<ButtonVariant>('primary');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);
  disabledMessage = input<string | undefined>(undefined);
  loading = input(false);

  private element = inject(ElementRef);

  handleClick(event: MouseEvent) {
    console.log(this.loading());
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return;
    }
  }

  ngOnInit() {
    this.element.nativeElement.addEventListener(
      'click',
      this.handleClick.bind(this),
      true,
    );
  }

  ngOnDestroy() {
    this.element.nativeElement.removeEventListener(
      'click',
      this.handleClick.bind(this),
      true,
    );
  }
}
