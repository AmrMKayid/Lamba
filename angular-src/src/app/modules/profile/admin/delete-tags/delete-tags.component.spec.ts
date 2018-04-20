import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTagsComponent } from './delete-tags.component';

describe('DeleteTagsComponent', () => {
  let component: DeleteTagsComponent;
  let fixture: ComponentFixture<DeleteTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
