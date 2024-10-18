import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoryEntity } from '@entities/Category.entity';
import { Observable, Observer } from 'rxjs';
import { environment } from '@environments/environment.local';
import axios, { AxiosError } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesEndpoint = `${environment.apiUrl}/category`;
  private apiUrl: string = environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {}

  async getAll() {
    try {
      const response = await axios.get(this.categoriesEndpoint);
      return response.data;
    } catch (error) {
      return error as AxiosError;
    }
  }

  public getCategoriesWithMostProducts(): Observable<CategoryEntity[]> {
    return this.httpClient.get<CategoryEntity[]>(
      `${this.apiUrl}/category/most/products`
    );
  }
}
