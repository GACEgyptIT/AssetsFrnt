import { TestBed } from '@angular/core/testing';

import { InvoicemngService } from './invoicemng.service';

describe('InvoicemngService', () => {
  let service: InvoicemngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicemngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
