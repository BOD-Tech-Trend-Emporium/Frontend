export interface CartResponseDto {
    userId: string,
    shoppingCart: Array<string>,
    shippingCost: number,
    finalTotal: number
}

export interface CartWithCouponResponseDto extends CartResponseDto{
    couponApplied: CouponDto,
    totalBeforeDiscount: number,
    totalAfterDiscount: number

}

export interface CouponDto {
    coupon_code: string,
    discount_percentage: number

}

export interface DeleteCartToProductByProductIdResponseDto {
    message: string
}

export interface UpdateCartDto {
    couponCode: string
}

export interface purchaseResponseDto {
    message: string
}