import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LithuanianDetailsComponent } from './lithuanian-details.component';

describe('LithuanianDetailsComponent', () => {
  let component: LithuanianDetailsComponent;
  let fixture: ComponentFixture<LithuanianDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LithuanianDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LithuanianDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
