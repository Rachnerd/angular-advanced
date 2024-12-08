import { Component, inject } from '@angular/core';
import { ToasterComponent } from '@angular-advanced/ui-components/toaster/toaster.component';
import { ToastService } from './toaster.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-toaster-smart',
  standalone: true,
  imports: [ToasterComponent],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
})
export class ToasterSmartComponent {
  private toasterService = inject(ToastService);
  toasts = toSignal(this.toasterService.toasts$, {
    initialValue: [],
  });
}
