import { TestBed } from '@angular/core/testing';

import { SohService } from './soh.service';

describe('SohService', () => {
  let service: SohService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SohService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
