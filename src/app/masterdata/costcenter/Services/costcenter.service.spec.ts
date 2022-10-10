import { TestBed } from '@angular/core/testing';

import { CostcenterService } from './costcenter.service';

describe('CostcenterService', () => {
  let service: CostcenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostcenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
