import { Injectable } from '@angular/core';
import { ProductEntity } from '@entities/Product.entity';
import { environment } from '@environments/environment.local';
import axios, { AxiosError } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsEndpoint = `${environment.apiUrl}/products/store`;

  constructor() {}

  async getAll(): Promise<ProductEntity[] | AxiosError> {
    try {
      const response = await axios.get(this.productsEndpoint);
      return response.data;
    } catch (error) {
      return error as AxiosError;
    }
  }
}
