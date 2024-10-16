import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageBestSellingProductsComponent } from './landingpage-best-selling-products.component';

describe('LandingpageBestSellingProductsComponent', () => {
  let component: LandingpageBestSellingProductsComponent;
  let fixture: ComponentFixture<LandingpageBestSellingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingpageBestSellingProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageBestSellingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
