import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseractionlogComponent } from './useractionlog.component';

describe('UseractionlogComponent', () => {
  let component: UseractionlogComponent;
  let fixture: ComponentFixture<UseractionlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseractionlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseractionlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
