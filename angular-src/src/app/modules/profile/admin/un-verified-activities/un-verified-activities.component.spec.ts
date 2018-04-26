import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnVerifiedActivitiesComponent } from './un-verified-activities.component';

describe('UnVerifiedActivitiesComponent', () => {
  let component: UnVerifiedActivitiesComponent;
  let fixture: ComponentFixture<UnVerifiedActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnVerifiedActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnVerifiedActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
