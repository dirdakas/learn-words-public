import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningGamesComponent } from './learning-games.component';

describe('LearningGamesComponent', () => {
  let component: LearningGamesComponent;
  let fixture: ComponentFixture<LearningGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
