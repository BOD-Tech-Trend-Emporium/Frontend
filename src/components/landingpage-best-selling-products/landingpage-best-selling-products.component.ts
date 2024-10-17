import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BasicImagenComponent } from '@components/basic-imagen/basic-imagen.component';
import { ProductEntity } from '@entities/Product.entity';
import { ProductService } from '@services/product/product.service';
import { WhiteButtonComponent } from '../white-button/white-button.component';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landingpage-best-selling-products',
  standalone: true,
  imports: [
    CurrencyPipe,
    BasicImagenComponent,
    WhiteButtonComponent,
    RouterLink,
  ],
  templateUrl: './landingpage-best-selling-products.component.html',
  styleUrl: './landingpage-best-selling-products.component.css',
})
export class LandingpageBestSellingProductsComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  bestSellingProducts: ProductEntity[] = [];
  toastr: ToastrService = inject(ToastrService);

  isLoading = true;
  ngOnInit(): void {
    this.productService.getBestSellingProducts().subscribe({
      next: (products: ProductEntity[]) => {
        this.bestSellingProducts = products;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.toastr.error('Connection error when fetching best selling products');
        this.isLoading = false;
      },
    });
  }
}
