import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulipleselectboxComponent } from './mulipleselectbox.component';

describe('MulipleselectboxComponent', () => {
  let component: MulipleselectboxComponent;
  let fixture: ComponentFixture<MulipleselectboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulipleselectboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulipleselectboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
