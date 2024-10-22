import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CartResponseDto, CartWithCouponResponseDto, purchaseResponseDto, UpdateCartDto} from '@entities/Cart.entity';
import { UserDataEntity } from '@entities/UserData.entity';
import { environment } from '@environments/environment.local';
import { AuthService } from '@services/auth/auth.service';
import { catchError, Observable, take, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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
  
  public getPendingCart(): Observable<CartResponseDto | CartWithCouponResponseDto>{
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${this.userData?.token}`
    });
    return this.httpClient.get<CartResponseDto | CartWithCouponResponseDto>(
      `${this.apiUrl}/cart` ,{
        headers: reqHeader
      }
    ).pipe(
      catchError(this.handleError));
}

public addCoupon(updateCart: UpdateCartDto): Observable<CartWithCouponResponseDto> {
  const reqHeader = new HttpHeaders({
    'Authorization': `Bearer ${this.userData?.token}`
  });
  return this.httpClient.patch<CartWithCouponResponseDto>(
    `${this.apiUrl}/cart` , updateCart,{
      headers: reqHeader
    }
  ).pipe(
    catchError(this.handleError));
}

public purchase(): Observable<purchaseResponseDto> {
  const reqHeader = new HttpHeaders({
    'Authorization': `Bearer ${this.userData?.token}`
  });
  return this.httpClient.post<purchaseResponseDto>(
    `${this.apiUrl}/cart/purchase`,'',{
      headers: reqHeader
    }
  ).pipe(
    catchError(this.handleError));
}


private handleError(error: HttpErrorResponse){
  return throwError(error)
}

}
