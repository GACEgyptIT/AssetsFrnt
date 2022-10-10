import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeguideComponent } from './codeguide.component';

describe('CodeguideComponent', () => {
  let component: CodeguideComponent;
  let fixture: ComponentFixture<CodeguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
