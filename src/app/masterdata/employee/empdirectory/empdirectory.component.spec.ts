import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpdirectoryComponent } from './empdirectory.component';

describe('EmpdirectoryComponent', () => {
  let component: EmpdirectoryComponent;
  let fixture: ComponentFixture<EmpdirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpdirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpdirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
