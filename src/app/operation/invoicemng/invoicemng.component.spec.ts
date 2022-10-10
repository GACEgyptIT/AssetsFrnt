import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicemngComponent } from './invoicemng.component';

describe('InvoicemngComponent', () => {
  let component: InvoicemngComponent;
  let fixture: ComponentFixture<InvoicemngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicemngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicemngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
