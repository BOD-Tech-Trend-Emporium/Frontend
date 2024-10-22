import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CartToProductDto, CreateCartToProductDto } from '@entities/CartToProduct';
import { UserDataEntity } from '@entities/UserData.entity';
import { environment } from '@environments/environment.local';
import { AuthService } from '@services/auth/auth.service';
import { catchError, Observable, take, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartToProductService {
  private apiUrl: string = environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);
  private userData: UserDataEntity | null = null;
  constructor() {
    this.authService
      .getUserData()
      .pipe(take(1))
      .subscribe((data) => {
        this.userData = data;
      });
  }
  public addProductInCart(createCartToProductDto: CreateCartToProductDto): Observable<CartToProductDto>{
      const reqHeader = new HttpHeaders({
        'Authorization': `Bearer ${this.userData?.token}`
      });
      return this.httpClient.post<CartToProductDto>(
        `${this.apiUrl}/cart/product`,createCartToProductDto ,{
          headers: reqHeader
        }
      ).pipe(
        catchError(this.handleError));
    

  }

  private handleError(error: HttpErrorResponse){
    return throwError(error)
  }
}
