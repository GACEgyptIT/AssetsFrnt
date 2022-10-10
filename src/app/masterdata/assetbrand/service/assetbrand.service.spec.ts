import { TestBed } from '@angular/core/testing';

import { AssetbrandService } from './assetbrand.service';

describe('AssetbrandService', () => {
  let service: AssetbrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetbrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
