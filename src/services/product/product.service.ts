import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductEntity } from '@entities/Product.entity';
import { environment } from '@environments/environment.local';
import axios, { AxiosError } from 'axios';
import { get } from 'node_modules/axios/index.cjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsEndpoint = `${environment.apiUrl}/products/store`;
  private apiUrl: string = environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {}

  async getAll(): Promise<ProductEntity[] | AxiosError> {
    try {
      const response = await axios.get(this.productsEndpoint);
      return response.data;
    } catch (error) {
      return error as AxiosError;
    }
  }

  public getBestSellingProducts(): Observable<ProductEntity[]> {
    return this.httpClient.get<ProductEntity[]>(
      `${this.apiUrl}/products/best/selling`
    );
  }

  public getLatestProducts(): Observable<ProductEntity[]> {
    return this.httpClient.get<ProductEntity[]>(
      `${this.apiUrl}/products/three/latest`
    );
  }

  public getProductById(id: string):Observable<ProductEntity>{
    return this.httpClient.get<ProductEntity>(
      `${this.apiUrl}/products/${id}`
    );
  }

}
