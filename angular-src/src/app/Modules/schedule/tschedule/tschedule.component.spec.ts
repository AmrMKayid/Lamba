import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TscheduleComponent } from './tschedule.component';

describe('TscheduleComponent', () => {
  let component: TscheduleComponent;
  let fixture: ComponentFixture<TscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
