import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeimportComponent } from './employeeimport.component';

describe('EmployeeimportComponent', () => {
  let component: EmployeeimportComponent;
  let fixture: ComponentFixture<EmployeeimportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeimportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeimportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
