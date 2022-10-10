import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoorderComponent } from './poorder.component';

describe('PoorderComponent', () => {
  let component: PoorderComponent;
  let fixture: ComponentFixture<PoorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
