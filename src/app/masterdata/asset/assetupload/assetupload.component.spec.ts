import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetuploadComponent } from './assetupload.component';

describe('AssetuploadComponent', () => {
  let component: AssetuploadComponent;
  let fixture: ComponentFixture<AssetuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
