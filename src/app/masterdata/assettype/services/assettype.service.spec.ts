import { TestBed } from '@angular/core/testing';

import { AssettypeService } from './assettype.service';

describe('AssettypeService', () => {
  let service: AssettypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssettypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
