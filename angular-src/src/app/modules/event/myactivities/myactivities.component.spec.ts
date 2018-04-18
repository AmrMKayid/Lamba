import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyactivitiesComponent} from './myactivities.component';

describe('MyitemsComponent', () => {
  let component: MyactivitiesComponent;
  let fixture: ComponentFixture<MyactivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyactivitiesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
