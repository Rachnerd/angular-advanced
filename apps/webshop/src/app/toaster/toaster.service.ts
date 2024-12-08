import { Injectable } from '@angular/core';
import { delay, map, mergeWith, Observable, ReplaySubject, scan } from 'rxjs';
import { Toast } from '@angular-advanced/ui-components/toaster/toaster.component';
import { mapToArray } from '../shared/data.utils';

interface ToastState extends Toast {
  status: 'place' | 'fade' | 'remove';
}

type ToastStateMap = Record<string, ToastState>;

const TOAST_CONFIG = {
  duration: 3000,
  removeDelay: 300,
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new ReplaySubject<ToastState>(1);

  private toastFade$: Observable<ToastState> = this.toastsSubject.pipe(
    delay(TOAST_CONFIG.duration),
    map((toast) => ({ ...toast, status: 'fade', removing: true })),
  );

  private toastRemoved$: Observable<ToastState> = this.toastsSubject.pipe(
    delay(TOAST_CONFIG.duration + TOAST_CONFIG.removeDelay),
    map((toast) => ({ ...toast, status: 'remove' })),
  );

  toasts$: Observable<Toast[]> = this.toastsSubject.pipe(
    mergeWith(this.toastFade$),
    mergeWith(this.toastRemoved$),
    scan((acc: ToastStateMap, toast: ToastState) => {
      switch (toast.status) {
        case 'place':
        case 'fade':
          return {
            ...acc,
            [toast.id]: toast,
          };
        case 'remove':
          delete acc[toast.id];
          return {
            ...acc,
          };
      }
    }, {}),
    map(mapToArray),
  );

  show(message: string, type: Toast['type'] = 'default'): void {
    this.toastsSubject.next({
      id: crypto.randomUUID(),
      message,
      type,
      removing: false,
      status: 'place',
    });
  }
}
