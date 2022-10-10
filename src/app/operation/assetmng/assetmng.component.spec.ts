import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetmngComponent } from './assetmng.component';

describe('AssetmngComponent', () => {
  let component: AssetmngComponent;
  let fixture: ComponentFixture<AssetmngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetmngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetmngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
