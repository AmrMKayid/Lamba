import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTeacherComponent } from './verify-teacher.component';

describe('VerifyTeacherComponent', () => {
  let component: VerifyTeacherComponent;
  let fixture: ComponentFixture<VerifyTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
