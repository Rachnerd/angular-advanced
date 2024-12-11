import { Component, inject } from '@angular/core';
import { ToasterComponent } from '@angular-advanced/ui-components/toaster/toaster.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastService } from '../../services/toaster.service';

@Component({
  selector: 'app-toaster-smart',
  standalone: true,
  imports: [ToasterComponent],
  templateUrl: './toaster-smart.component.html',
  styleUrl: './toaster-smart.component.scss',
})
export class ToasterSmartComponent {
  private toasterService = inject(ToastService);
  toasts = toSignal(this.toasterService.toasts$, {
    initialValue: [],
  });
}
