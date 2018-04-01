import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyArticleComponent } from './verify-article.component';

describe('VerifyArticleComponent', () => {
  let component: VerifyArticleComponent;
  let fixture: ComponentFixture<VerifyArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
