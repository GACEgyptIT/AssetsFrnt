import { TestBed } from '@angular/core/testing';

import { AsscatserviceService } from './asscatservice.service';

describe('AsscatserviceService', () => {
  let service: AsscatserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsscatserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
