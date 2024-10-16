import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageArrivalsComponent } from './landingpage-arrivals.component';

describe('LandingpageArrivalsComponent', () => {
  let component: LandingpageArrivalsComponent;
  let fixture: ComponentFixture<LandingpageArrivalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingpageArrivalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageArrivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
