import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicemailsComponent } from './dynamicemails.component';

describe('DynamicemailsComponent', () => {
  let component: DynamicemailsComponent;
  let fixture: ComponentFixture<DynamicemailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicemailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicemailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
