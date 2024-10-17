import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductEntity } from '@entities/Product.entity';
import { ProductService } from '@services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { BasicImagenComponent } from "../../components/basic-imagen/basic-imagen.component";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [BasicImagenComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  private productService: ProductService = inject(ProductService);
  private route = inject(ActivatedRoute);
  productEntity?: ProductEntity;
  isLoading = true;
  toastr: ToastrService = inject(ToastrService);

  ngOnInit(): void {
    this.route.params.subscribe({
      next:(params: Params)=>{
        this.productService.getProductById(params['id']).subscribe({
          next:(data: ProductEntity)=>{
            this.productEntity = data;
            this.isLoading = false;
          },
          error:(error:any)=>{
            error.error.Message ? this.toastr.error(error.error.Message) : this.toastr.error('Unexpected error occurred') 
            this.isLoading = false;
          }
        })
      },
      error:(error:any)=>{
        this.toastr.error('Unexpected error occurred');
      }

    })
  }

}
