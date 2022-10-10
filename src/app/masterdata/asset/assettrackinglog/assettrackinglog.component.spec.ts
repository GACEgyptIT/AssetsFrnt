import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssettrackinglogComponent } from './assettrackinglog.component';

describe('AssettrackinglogComponent', () => {
  let component: AssettrackinglogComponent;
  let fixture: ComponentFixture<AssettrackinglogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssettrackinglogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssettrackinglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
