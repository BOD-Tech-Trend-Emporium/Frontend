export interface CreateCartToProductDto {
    productId: string,
    quantity: number
}

export interface CartToProductDto {
    priceId: string,
    cartId: string
}
