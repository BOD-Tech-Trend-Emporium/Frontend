import { Injectable } from '@angular/core';
import { Login } from '@entities/Login.entity';
import axios from 'axios';
import { environment } from '@environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl = `${environment.apiUrl}/login`;

  constructor() {}

  async loginUser(
    loginForm: Partial<{
      email: string | null;
      password: string | null;
      save: boolean | null;
    }>
  ) {
    const requestBody = {
      email: loginForm.email,
      password: loginForm.password,
    };
    try {
      const response = await axios.post(this.loginUrl, requestBody);
      return response;
    } catch (error) {
      return error;
    }
  }
}
