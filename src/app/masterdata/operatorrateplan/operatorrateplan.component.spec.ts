import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorrateplanComponent } from './operatorrateplan.component';

describe('OperatorrateplanComponent', () => {
  let component: OperatorrateplanComponent;
  let fixture: ComponentFixture<OperatorrateplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorrateplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorrateplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
