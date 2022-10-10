import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrrequestComponent } from './prrequest.component';

describe('PrrequestComponent', () => {
  let component: PrrequestComponent;
  let fixture: ComponentFixture<PrrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
