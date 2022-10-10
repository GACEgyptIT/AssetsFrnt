import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SOHComponent } from './soh.component';

describe('SOHComponent', () => {
  let component: SOHComponent;
  let fixture: ComponentFixture<SOHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SOHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SOHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
