import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductEntity } from '@entities/Product.entity';
import { UserDataEntity } from '@entities/UserData.entity';
import { environment } from '@environments/environment.local';
import { AuthService } from '@services/auth/auth.service';
import axios, { AxiosError } from 'axios';
import { firstValueFrom, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseApiUrl: string = `${environment.apiUrl}/products`;
  private productsStoreEndpoint = `${this.baseApiUrl}/store`;
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  constructor() {}

  async getUserData() {
    try {
      const response = await firstValueFrom(
        this.authService.getUserData().pipe(take(1))
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAll(): Promise<ProductEntity[] | AxiosError> {
    try {
      const response = await axios.get(this.baseApiUrl);
      return response.data;
    } catch (error) {
      return error as AxiosError;
    }
  }

  async createProduct(
    request: Partial<ProductEntity>
  ): Promise<string | AxiosError> {
    console.log(request);
    try {
      const userData: any = await this.getUserData();
      const response = await axios.post(this.baseApiUrl, request, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error as AxiosError;
    }
  }

  async editProduct(
    request: Partial<ProductEntity>,
    id: string
  ): Promise<string | AxiosError> {
    try {
      const userData: any = await this.getUserData();
      const response = await axios.put(`${this.baseApiUrl}/${id}`, request, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error as AxiosError;
    }
  }

  public getBestSellingProducts(): Observable<ProductEntity[]> {
    return this.httpClient.get<ProductEntity[]>(
      `${this.baseApiUrl}/best/selling`
    );
  }

  public getLatestProducts(): Observable<ProductEntity[]> {
    return this.httpClient.get<ProductEntity[]>(
      `${this.baseApiUrl}/three/latest`
    );
  }
}
