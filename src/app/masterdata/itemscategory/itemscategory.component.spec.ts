import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemscategoryComponent } from './itemscategory.component';

describe('ItemscategoryComponent', () => {
  let component: ItemscategoryComponent;
  let fixture: ComponentFixture<ItemscategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemscategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemscategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
