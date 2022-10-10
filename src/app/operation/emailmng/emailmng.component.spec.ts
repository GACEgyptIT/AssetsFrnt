import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailmngComponent } from './emailmng.component';

describe('EmailmngComponent', () => {
  let component: EmailmngComponent;
  let fixture: ComponentFixture<EmailmngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailmngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailmngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
