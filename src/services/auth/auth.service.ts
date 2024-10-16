import { Injectable } from '@angular/core';
import { LoginEntity } from '@entities/Login.entity';
import axios from 'axios';
import { environment } from '@environments/environment.local';
import { SignUpEntity } from '@entities/Signup.entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserEntity } from '@entities/User.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData = new BehaviorSubject<UserEntity | null>(null);
  private loginUrl = `${environment.apiUrl}/login`;
  private signUpUrl = `${environment.apiUrl}/auth`;

  constructor() {}

  async login(request: LoginEntity) {
    try {
      const response = await axios.post(this.loginUrl, request);
      this.userData.next(response.data);
      if (request.save) {
        localStorage.setItem('userData', JSON.stringify(response.data));
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  async signup(request: SignUpEntity) {
    try {
      const response = await axios.post(this.signUpUrl, request);
      return response;
    } catch (error) {
      return error;
    }
  }

  async logout() {
    localStorage.removeItem('userData');
    this.userData.next(null);
  }

  getUserToken() {
    return this.userData.asObservable();
  }

  loadUserTokenFromStorage() {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      this.userData.next(JSON.parse(storedUser));
    }
  }
}
