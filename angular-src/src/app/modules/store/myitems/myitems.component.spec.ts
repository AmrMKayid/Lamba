import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyitemsComponent } from './myitems.component';

describe('MyitemsComponent', () => {
  let component: MyitemsComponent;
  let fixture: ComponentFixture<MyitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
