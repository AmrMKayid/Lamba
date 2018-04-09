import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnVerifiedArticlesComponent } from './un-verified-articles.component';

describe('UnVerifiedArticlesComponent', () => {
  let component: UnVerifiedArticlesComponent;
  let fixture: ComponentFixture<UnVerifiedArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnVerifiedArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnVerifiedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
