import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormWrapperComponent } from "../form-wrapper/form-wrapper.component";
import { TextFieldComponent } from "../form-fields/text-field/text-field.component";
import { PrimaryButtonComponent } from "../../buttons/primary-button/primary-button.component";
import { CartService } from '@services/cart/cart.service';
import { CartWithCouponResponseDto, UpdateCartDto } from '@entities/Cart.entity';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-coupon-form',
  standalone: true,
  imports: [FormWrapperComponent, TextFieldComponent, PrimaryButtonComponent],
  templateUrl: './coupon-form.component.html',
  styleUrl: './coupon-form.component.css'
})
export class CouponFormComponent {
  cartService: CartService = inject(CartService);
  toastr: ToastrService = inject(ToastrService);
  @Output() emitter = new EventEmitter<CartWithCouponResponseDto>();

  couponForm = new FormGroup({
    coupon: new FormControl(''),
  });


  handleActionButton(event: FormGroup) {
    const requestBody: UpdateCartDto = {
      couponCode: event.value.coupon,
    };
    this.cartService.addCoupon(requestBody).subscribe({
      next: (data: CartWithCouponResponseDto)=>{
        this.toastr.success('Coupon was added successfully')
        this.emitter.emit(data);
      },
      error: (error)=>{
        if(error instanceof HttpErrorResponse && error.statusText=='Unauthorized'){
          this.toastr.error('You have to log in');
        } 
        error.error.Message ? this.toastr.error(error.error.Message) : this.toastr.error('Unexpected error occurred') 
      }
    })
  }

}
