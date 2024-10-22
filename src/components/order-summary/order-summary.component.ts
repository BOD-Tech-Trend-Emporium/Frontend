import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CouponFormComponent } from "../forms/coupon-form/coupon-form.component";
import { CartResponseDto, CartWithCouponResponseDto, purchaseResponseDto } from '@entities/Cart.entity';
import { CurrencyPipe } from '@angular/common';
import { BlackButtonFunctionComponent } from "../black-button-function/black-button-function.component";
import { CartService } from '@services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CouponFormComponent, CurrencyPipe, BlackButtonFunctionComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
  @Input() cartResponseDto?:CartWithCouponResponseDto | CartResponseDto ;
  @Output() bought = new EventEmitter<void>
  cartService: CartService = inject(CartService);
  toastr: ToastrService = inject(ToastrService);
  
  getCouponResponse(event: CartWithCouponResponseDto){
    this.cartResponseDto = event;
  }

  purchase(){
    this.cartService.purchase().subscribe({
      next: (data: purchaseResponseDto)=>{
        this.bought.emit();
        this.toastr.success(data.message);
      },
      error: (error)=>{
        if(error instanceof HttpErrorResponse && error.statusText=='Unauthorized'){
          this.toastr.error('You have to log in');
        } 
        error.error.Message ? this.toastr.error(error.error.Message) : this.toastr.error('Unexpected error occurred');
      }
    })
  }
}
