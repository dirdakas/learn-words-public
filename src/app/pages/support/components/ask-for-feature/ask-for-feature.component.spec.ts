import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskForFeatureComponent } from './ask-for-feature.component';

describe('AskForFeatureComponent', () => {
  let component: AskForFeatureComponent;
  let fixture: ComponentFixture<AskForFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskForFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskForFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
