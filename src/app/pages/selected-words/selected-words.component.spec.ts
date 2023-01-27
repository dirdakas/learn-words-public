import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedWordsComponent } from './selected-words.component';

describe('SelectedWordsComponent', () => {
  let component: SelectedWordsComponent;
  let fixture: ComponentFixture<SelectedWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
