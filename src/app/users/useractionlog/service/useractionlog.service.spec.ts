import { TestBed } from '@angular/core/testing';

import { UseractionlogService } from './useractionlog.service';

describe('UseractionlogService', () => {
  let service: UseractionlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseractionlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
