import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpraccnumberComponent } from './opraccnumber.component';

describe('OpraccnumberComponent', () => {
  let component: OpraccnumberComponent;
  let fixture: ComponentFixture<OpraccnumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpraccnumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpraccnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
