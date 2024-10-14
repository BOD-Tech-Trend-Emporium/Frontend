import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselImagenComponent } from '@components/carousel-imagen/carousel-imagen.component';
import { ProductDto } from '@entities/Product.entity';
import { ProductService } from '@services/product/product.service';

@Component({
  selector: 'app-landingpage-best-selling-products',
  standalone: true,
  imports: [CurrencyPipe, CarouselImagenComponent],
  templateUrl: './landingpage-best-selling-products.component.html',
  styleUrl: './landingpage-best-selling-products.component.css'
})
export class LandingpageBestSellingProductsComponent implements OnInit{

  private productService: ProductService = inject(ProductService);
  bestSellingProducts: ProductDto[] =[];

  ngOnInit(): void {
    this.productService.getBestSellingProducts().subscribe({
      next: (products: ProductDto[])=>{
        this.bestSellingProducts = products;
      },
      error: (error: any)=>{}
    });
  }

}
