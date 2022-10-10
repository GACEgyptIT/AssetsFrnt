import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssettypeComponent } from './assettype.component';

describe('AssettypeComponent', () => {
  let component: AssettypeComponent;
  let fixture: ComponentFixture<AssettypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssettypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssettypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
