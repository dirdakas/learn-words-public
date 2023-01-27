import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWordsSelectionComponent } from './new-words-selection.component';

describe('NewWordsSelectionComponent', () => {
  let component: NewWordsSelectionComponent;
  let fixture: ComponentFixture<NewWordsSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWordsSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWordsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
