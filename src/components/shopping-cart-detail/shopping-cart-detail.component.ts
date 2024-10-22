import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CartResponseDto, CartWithCouponResponseDto, DeleteCartToProductByProductIdResponseDto } from '@entities/Cart.entity';
import { ProductByIdDto } from '@entities/Product.entity';
import { CartToProductService } from '@services/cart-to-product/cart-to-product.service';
import { CartService } from '@services/cart/cart.service';
import { ProductService } from '@services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { BasicImagenComponent } from "../basic-imagen/basic-imagen.component";
import { Observable, of } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { OrderSummaryComponent } from "../order-summary/order-summary.component";

@Component({
  selector: 'app-shopping-cart-detail',
  standalone: true,
  imports: [BasicImagenComponent, CurrencyPipe, OrderSummaryComponent],
  templateUrl: './shopping-cart-detail.component.html',
  styleUrl: './shopping-cart-detail.component.css'
})
export class ShoppingCartDetailComponent implements OnInit{

  cartService: CartService = inject(CartService);
  productService: ProductService = inject(ProductService);
  cartToProductService: CartToProductService = inject(CartToProductService);
  toastr: ToastrService = inject(ToastrService);
  cartResponseDto?: CartResponseDto | CartWithCouponResponseDto;
  products: Array<ProductByIdDto> =[];

  ngOnInit(): void {
    this.getPendingCart();
  }

  getPendingCart(){
    this.cartService.getPendingCart().subscribe({
      next: (data: CartResponseDto | CartWithCouponResponseDto)=>{
        this.cartResponseDto = data;
        this.getProducts(data.shoppingCart);
      },
      error: (error: any) =>{
        if(error instanceof HttpErrorResponse && error.statusText=='Unauthorized'){
          this.toastr.error('You have to log in');
        } 
        error.error.Message ? '' : this.toastr.error('Unexpected error occurred');
        if (this.cartResponseDto) {
          this.cartResponseDto.finalTotal = 0; 
        }
      }
    })
  }


  getProducts(ids: Array<string>){
    ids.forEach(id => {
      console.log(id);
      this.productService.getProductById(id).subscribe({
        next: (data: ProductByIdDto)=>{
          this.products?.push(data);

        },
        error: (error: any)=>{
          this.products = []
          if(error instanceof HttpErrorResponse && error.statusText=='Unauthorized'){
            this.toastr.error('You have to log in');
          } 
          error.error.Message ? this.toastr.error(error.error.Message) : this.toastr.error('Unexpected error occurred');
        }
      })
    });
  }

  deleteAProductById(id: string){
    this.cartToProductService.removeAProductFromCart(id).subscribe({
      next: (data: DeleteCartToProductByProductIdResponseDto)=>{
        this.toastr.success(data.message);
        this.products = [];
        this.getPendingCart();
      },
      error: (error)=>{
        if(error instanceof HttpErrorResponse && error.statusText=='Unauthorized'){
          this.toastr.error('You have to log in');
        } 
        error.error.Message ? this.toastr.error(error.error.Message) : this.toastr.error('Unexpected error occurred') 
      }
    })
  }

  cleanAll(){
    this.getPendingCart()
    this.products = []

  }

}
