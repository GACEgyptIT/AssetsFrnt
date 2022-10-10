import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenaricemailComponent } from './genaricemail.component';

describe('GenaricemailComponent', () => {
  let component: GenaricemailComponent;
  let fixture: ComponentFixture<GenaricemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenaricemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenaricemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
