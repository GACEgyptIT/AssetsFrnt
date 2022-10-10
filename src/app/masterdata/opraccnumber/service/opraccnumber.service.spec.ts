import { TestBed } from '@angular/core/testing';

import { OpraccnumberService } from './opraccnumber.service';

describe('OpraccnumberService', () => {
  let service: OpraccnumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpraccnumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
