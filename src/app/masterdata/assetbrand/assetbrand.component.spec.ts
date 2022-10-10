import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetbrandComponent } from './assetbrand.component';

describe('AssetbrandComponent', () => {
  let component: AssetbrandComponent;
  let fixture: ComponentFixture<AssetbrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetbrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetbrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
