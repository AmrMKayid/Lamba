import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTeacherComponent } from './booking-teacher.component';

describe('BookingTeacherComponent', () => {
  let component: BookingTeacherComponent;
  let fixture: ComponentFixture<BookingTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
