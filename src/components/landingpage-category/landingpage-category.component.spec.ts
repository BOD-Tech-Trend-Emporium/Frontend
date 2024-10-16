import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingpageCategoryComponent } from './landingpage-category.component';

describe('LandingpageCategoryComponent', () => {
  let component: LandingpageCategoryComponent;
  let fixture: ComponentFixture<LandingpageCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingpageCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingpageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
