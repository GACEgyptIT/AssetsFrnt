import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowadaccountsComponent } from './showadaccounts.component';

describe('ShowadaccountsComponent', () => {
  let component: ShowadaccountsComponent;
  let fixture: ComponentFixture<ShowadaccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowadaccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowadaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
