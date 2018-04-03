import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CscheduleComponent } from './cschedule.component';

describe('CscheduleComponent', () => {
  let component: CscheduleComponent;
  let fixture: ComponentFixture<CscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
