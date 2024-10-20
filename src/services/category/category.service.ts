import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoryEntity, CreateCategoryDto, UpdateCategoryByIdResponseDto, UpdateCategoryDto } from '@entities/Category.entity';
import { catchError, Observable, Observer, take, throwError } from 'rxjs';
import { environment } from '@environments/environment.local';
import axios, { AxiosError } from 'axios';
import { UserDataEntity } from '@entities/UserData.entity';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesEndpoint = `${environment.apiUrl}/category`;
  private apiUrl: string = environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);
  private userData: UserDataEntity | null = null;
  private authService: AuthService = inject(AuthService);

  constructor() {
    this.authService
    .getUserData()
    .pipe(take(1))
    .subscribe((data) => {
      this.userData = data;
    });
  }

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

  public createCategory(category: CreateCategoryDto): Observable<CategoryEntity>{
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${this.userData?.token}`
    });
    return this.httpClient.post<CategoryEntity>(`${this.apiUrl}/category`, category,{
      headers: reqHeader
    }).pipe(
      catchError(this.handleError));;
  }

  public updateCategory(category: UpdateCategoryDto, id: string):Observable<UpdateCategoryByIdResponseDto>{
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${this.userData?.token}`
    });
    return this.httpClient.put<UpdateCategoryByIdResponseDto>(`${this.apiUrl}/category/${id}`, category,{
      headers: reqHeader
    }).pipe(
      catchError(this.handleError));;
  }


  private handleError(error: HttpErrorResponse){
    return throwError(error)
  }
}
