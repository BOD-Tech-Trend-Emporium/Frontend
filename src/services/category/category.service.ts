import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoryDto } from '@entities/Category.entity';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  private apiUrl:string= environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);

  public getCategoriesWithMostProducts():Observable<CategoryDto[]>{
    return this.httpClient.get<CategoryDto[]>(`${this.apiUrl}/category/most/products`);
  }

}
