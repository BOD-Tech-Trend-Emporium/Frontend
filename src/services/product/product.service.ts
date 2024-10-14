import { inject, Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDto } from '@entities/Product.entity';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  private apiUrl:string= environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);

  public getBestSellingProducts():Observable<ProductDto[]> {
    return this.httpClient.get<ProductDto[]>(`${this.apiUrl}/products/best/selling`);
  }

  public getLatestProducts():Observable<ProductDto[]> {
    return this.httpClient.get<ProductDto[]>(`${this.apiUrl}/products/three/latest`);
  }

}
