import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewRequestComponent } from './interview-request.component';

describe('InterviewRequestComponent', () => {
  let component: InterviewRequestComponent;
  let fixture: ComponentFixture<InterviewRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
