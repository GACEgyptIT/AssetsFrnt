import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestmngComponent } from './requestmng.component';

describe('RequestmngComponent', () => {
  let component: RequestmngComponent;
  let fixture: ComponentFixture<RequestmngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestmngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestmngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
