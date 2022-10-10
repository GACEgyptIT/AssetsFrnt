import { TestBed } from '@angular/core/testing';

import { ExportexcelService } from './exportexcel.service';

describe('ExportexcelService', () => {
  let service: ExportexcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportexcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
