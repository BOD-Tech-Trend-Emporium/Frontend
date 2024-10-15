import { Component, inject, OnInit } from '@angular/core';
import { ProductDto } from '@entities/Product.entity';
import { ProductService } from '@services/product/product.service';
import { BasicImagenComponent } from "../basic-imagen/basic-imagen.component";
import { CurrencyPipe } from '@angular/common';
import { WhiteButtonComponent } from "../white-button/white-button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landingpage-arrivals',
  standalone: true,
  imports: [BasicImagenComponent, CurrencyPipe, WhiteButtonComponent, RouterLink],
  templateUrl: './landingpage-arrivals.component.html',
  styleUrl: './landingpage-arrivals.component.css'
})
export class LandingpageArrivalsComponent implements OnInit{
  private productService: ProductService = inject(ProductService);
  latestProducts: ProductDto[] =[];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.productService.getLatestProducts().subscribe({
      next: (products: ProductDto[])=>{
        this.latestProducts = products;
        this.isLoading = false;
      },
      error: (error: any)=>{
        this.isLoading = false;
      }
    });
  }

}
