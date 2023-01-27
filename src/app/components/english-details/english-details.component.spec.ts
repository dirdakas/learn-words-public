import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishDetailsComponent } from './english-details.component';

describe('EnglishDetailsComponent', () => {
  let component: EnglishDetailsComponent;
  let fixture: ComponentFixture<EnglishDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnglishDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnglishDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
