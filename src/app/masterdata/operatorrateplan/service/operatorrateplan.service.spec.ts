import { TestBed } from '@angular/core/testing';

import { OperatorrateplanService } from './operatorrateplan.service';

describe('OperatorrateplanService', () => {
  let service: OperatorrateplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatorrateplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
