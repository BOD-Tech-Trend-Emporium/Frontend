import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdetailDescriptionComponent } from './productdetail-description.component';

describe('ProductdetailDescriptionComponent', () => {
  let component: ProductdetailDescriptionComponent;
  let fixture: ComponentFixture<ProductdetailDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductdetailDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductdetailDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
