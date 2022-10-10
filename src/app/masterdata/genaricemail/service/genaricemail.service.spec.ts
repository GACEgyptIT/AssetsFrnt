import { TestBed } from '@angular/core/testing';

import { GenaricemailService } from './genaricemail.service';

describe('GenaricemailService', () => {
  let service: GenaricemailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenaricemailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
