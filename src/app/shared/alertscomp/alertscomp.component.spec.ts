import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertscompComponent } from './alertscomp.component';

describe('AlertscompComponent', () => {
  let component: AlertscompComponent;
  let fixture: ComponentFixture<AlertscompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertscompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertscompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
