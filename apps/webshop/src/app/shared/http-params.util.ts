import { HttpParams } from '@angular/common/http';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createHttpParams(params: Record<string, any>): HttpParams {
  return Object.entries(params).reduce((httpParams, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      return httpParams.set(key, value.toString());
    }
    return httpParams;
  }, new HttpParams());
}
