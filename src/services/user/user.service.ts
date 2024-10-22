import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateUserDto, UserDto, UserEntity } from '@entities/User.entity';
import { UserDataEntity } from '@entities/UserData.entity';
import { environment } from '@environments/environment.local';
import { AuthService } from '@services/auth/auth.service';
import axios, { AxiosError } from 'axios';
import { catchError, Observable, take, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData: UserDataEntity | null = null;
  private authService: AuthService = inject(AuthService);
  private usersEndpoint = `${environment.apiUrl}/user`;
  private adminEndpoint = `${environment.apiUrl}/admin/auth`;
  private httpClient: HttpClient = inject(HttpClient);


  constructor() {
    this.authService
      .getUserData()
      .pipe(take(1))
      .subscribe((data) => {
        this.userData = data;
      });
  }

  async getAll(): Promise<UserEntity[] | AxiosError> {
    try {
      const response = await axios.get(this.usersEndpoint, {
        headers: {
          Authorization: `Bearer ${this.userData?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error as AxiosError;
    }
  }

  public createEmployee(createUserDto: CreateUserDto): Observable<UserDto>{
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${this.userData?.token}`
    });
    return this.httpClient.post<UserDto>(`${this.adminEndpoint}`, createUserDto,{
      headers: reqHeader
    }).pipe(
      catchError(this.handleError));;
  }

  private handleError(error: HttpErrorResponse){
    return throwError(error)
  }
}
