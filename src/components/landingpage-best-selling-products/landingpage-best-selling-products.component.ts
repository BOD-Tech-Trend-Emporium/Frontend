import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselImagenComponent } from '@components/carousel-imagen/carousel-imagen.component';
import { ProductDto } from '@entities/Product.entity';
import { ProductService } from '@services/product/product.service';
import { WhiteButtonComponent } from "../white-button/white-button.component";

@Component({
  selector: 'app-landingpage-best-selling-products',
  standalone: true,
  imports: [CurrencyPipe, CarouselImagenComponent, WhiteButtonComponent],
  templateUrl: './landingpage-best-selling-products.component.html',
  styleUrl: './landingpage-best-selling-products.component.css'
})
export class LandingpageBestSellingProductsComponent implements OnInit{

  private productService: ProductService = inject(ProductService);
  bestSellingProducts: ProductDto[] =[];
  isLoading = true;
  ngOnInit(): void {
    this.productService.getBestSellingProducts().subscribe({
      next: (products: ProductDto[])=>{
        this.bestSellingProducts = products;
        this.isLoading = false;

      },
      error: (error: any)=>{}
    });
  }

}
