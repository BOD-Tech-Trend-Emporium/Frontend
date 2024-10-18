import { TestBed } from '@angular/core/testing';

import { CartToProductService } from './cart-to-product.service';

describe('CartToProductService', () => {
  let service: CartToProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartToProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
