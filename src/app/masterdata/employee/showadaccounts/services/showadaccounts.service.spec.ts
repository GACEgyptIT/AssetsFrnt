import { TestBed } from '@angular/core/testing';

import { ShowadaccountsService } from './showadaccounts.service';

describe('ShowadaccountsService', () => {
  let service: ShowadaccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowadaccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
