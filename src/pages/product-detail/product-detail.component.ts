import { Component, inject, OnInit } from '@angular/core';
import { ProductEntity } from '@entities/Product.entity';
import { ProductService } from '@services/product/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  private productService: ProductService = inject(ProductService);
  productEntity?: ProductEntity;
  isLoading = true;
  toastr: ToastrService = inject(ToastrService);

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
