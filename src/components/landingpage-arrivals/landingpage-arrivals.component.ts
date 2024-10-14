import { Component, inject, OnInit } from '@angular/core';
import { ProductDto } from '@entities/Product.entity';
import { ProductService } from '@services/product/product.service';
import { CarouselImagenComponent } from "../carousel-imagen/carousel-imagen.component";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-landingpage-arrivals',
  standalone: true,
  imports: [CarouselImagenComponent, CurrencyPipe],
  templateUrl: './landingpage-arrivals.component.html',
  styleUrl: './landingpage-arrivals.component.css'
})
export class LandingpageArrivalsComponent implements OnInit{
  private productService: ProductService = inject(ProductService);
  latestProducts: ProductDto[] =[];

  ngOnInit(): void {
    this.productService.getLatestProducts().subscribe({
      next: (products: ProductDto[])=>{
        this.latestProducts = products;
      },
      error: (error: any)=>{}
    });
  }

}
