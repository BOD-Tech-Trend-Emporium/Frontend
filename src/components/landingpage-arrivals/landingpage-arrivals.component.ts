import { Component, inject, OnInit } from '@angular/core';
import { ProductEntity } from '@entities/Product.entity';
import { ProductService } from '@services/product/product.service';
import { BasicImagenComponent } from '../basic-imagen/basic-imagen.component';
import { CurrencyPipe } from '@angular/common';
import { WhiteButtonComponent } from '../white-button/white-button.component';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landingpage-arrivals',
  standalone: true,
  imports: [
    BasicImagenComponent,
    CurrencyPipe,
    WhiteButtonComponent,
    RouterLink,
  ],
  templateUrl: './landingpage-arrivals.component.html',
  styleUrl: './landingpage-arrivals.component.css',
})
export class LandingpageArrivalsComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  latestProducts: ProductEntity[] = [];
  isLoading: boolean = true;
  toastr: ToastrService = inject(ToastrService);

  ngOnInit(): void {
    this.productService.getLatestProducts().subscribe({
      next: (products: ProductEntity[]) => {
        this.latestProducts = products;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.toastr.error('Connection error when fetching arrivals');
        this.isLoading = false;
      },
    });
  }
}
