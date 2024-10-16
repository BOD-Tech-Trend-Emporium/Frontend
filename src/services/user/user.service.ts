import { inject, Injectable } from '@angular/core';
import { UserEntity } from '@entities/User.entity';
import { UserDataEntity } from '@entities/UserData.entity';
import { environment } from '@environments/environment.local';
import { AuthService } from '@services/auth/auth.service';
import axios, { AxiosError } from 'axios';
import { take, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData: UserDataEntity | null = null;
  private authService: AuthService = inject(AuthService);
  private usersEndpoint = `${environment.apiUrl}/user`;

  constructor() {
    this.authService
      .getUserData()
      .pipe(take(1))
      .subscribe((data) => {
        this.userData = data;
      });
  }

  getUserData() {}

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
}
