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
  private userToken = new BehaviorSubject<UserEntity | null>(null);
  private loginUrl = `${environment.apiUrl}/login`;
  private signUpUrl = `${environment.apiUrl}/auth`;

  constructor() {}

  async login(request: LoginEntity) {
    try {
      const response = await axios.post(this.loginUrl, request);
      this.userToken.next(response.data);
      if (request.save) {
        localStorage.setItem('userToken', JSON.stringify(response.data));
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
    localStorage.removeItem('userToken');
    this.userToken.next(null);
  }

  getUserToken() {
    return this.userToken.asObservable();
  }

  loadUserTokenFromStorage() {
    const storedUser = localStorage.getItem('userToken');
    if (storedUser) {
      this.userToken.next(JSON.parse(storedUser));
    }
  }
}
