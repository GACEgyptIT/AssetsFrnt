import { TestBed } from '@angular/core/testing';

import { CustomvalidatorsService } from './customvalidators.service';

describe('CustomvalidatorsService', () => {
  let service: CustomvalidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomvalidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
