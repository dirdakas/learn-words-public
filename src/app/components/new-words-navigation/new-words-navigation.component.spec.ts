import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWordsNavigationComponent } from './new-words-navigation.component';

describe('NewWordsNavigationComponent', () => {
  let component: NewWordsNavigationComponent;
  let fixture: ComponentFixture<NewWordsNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWordsNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWordsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
