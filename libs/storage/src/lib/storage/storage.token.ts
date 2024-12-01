import { InjectionToken } from '@angular/core';
import type { Storage } from './storage.interface';

export const STORAGE = new InjectionToken<Storage>('STORAGE');
