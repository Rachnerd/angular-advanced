import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthenticationService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [] });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
