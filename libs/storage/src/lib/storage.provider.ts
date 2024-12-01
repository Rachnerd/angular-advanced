import type { Provider } from '@angular/core';
import { STORAGE } from './storage/storage.token';
import { Storage } from './storage/storage.interface';

export const provideStorage = (storage: new () => Storage): Provider => ({
  provide: STORAGE,
  useClass: storage,
});
