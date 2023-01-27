import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordActionsComponent } from './word-actions.component';

describe('WordActionsComponent', () => {
  let component: WordActionsComponent;
  let fixture: ComponentFixture<WordActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
