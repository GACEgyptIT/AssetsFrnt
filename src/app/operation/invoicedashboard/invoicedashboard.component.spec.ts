import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicedashboardComponent } from './invoicedashboard.component';

describe('InvoicedashboardComponent', () => {
  let component: InvoicedashboardComponent;
  let fixture: ComponentFixture<InvoicedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
