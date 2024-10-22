import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { WhiteButtonComponent } from '@components/white-button/white-button.component';
import { ProductByIdDto } from '@entities/Product.entity';
import { PrimaryButtonComponent } from "../buttons/primary-button/primary-button.component";
import { CounterComponent } from '@components/counter/counter.component';
import { CartToProductService } from '@services/cart-to-product/cart-to-product.service';
import { ToastrService } from 'ngx-toastr';
import { CartToProductDto, CreateCartToProductDto } from '@entities/CartToProduct';
import { BlackButtonFunctionComponent } from "../black-button-function/black-button-function.component";
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-productdetail-description',
  standalone: true,
  imports: [CurrencyPipe, WhiteButtonComponent, PrimaryButtonComponent, CounterComponent, BlackButtonFunctionComponent],
  templateUrl: './productdetail-description.component.html',
  styleUrl: './productdetail-description.component.css'
})
export class ProductdetailDescriptionComponent{
  @Input() productEntity?: ProductByIdDto;
  cartToProduct: CartToProductService = inject(CartToProductService);
  toastr: ToastrService = inject(ToastrService);
  createCartToProduct?:CreateCartToProductDto;
  private route = inject(ActivatedRoute);
  
  currentValue: number =1;
  getCurrentValue(event: number){
    this.currentValue = event;
  }

  getCost(){
    return this.currentValue * (this.productEntity?.price as number);
  }

  addToCart(){
    this.createCartToProduct= {productId: this.productEntity?.id || '', quantity: this.currentValue};
    
    this.cartToProduct.addProductInCart(this.createCartToProduct).subscribe({
      next: (data: CartToProductDto) => {
        this.toastr.success('The product was added successfully');
      },
      error: (error: any) =>{
        if(error instanceof HttpErrorResponse && error.statusText=='Unauthorized'){
          this.toastr.error('You have to log in');
        } 
        error.error.Message ? this.toastr.error(error.error.Message) : this.toastr.error('Unexpected error occurred') 
      }
    })

  }

}
