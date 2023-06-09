import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSvgComponent } from './loading-svg.component';

describe('LoadingSvgComponent', () => {
  let component: LoadingSvgComponent;
  let fixture: ComponentFixture<LoadingSvgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingSvgComponent]
    });
    fixture = TestBed.createComponent(LoadingSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
