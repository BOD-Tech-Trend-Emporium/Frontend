import { Injectable } from '@angular/core';
import { Login } from '@entities/Login.entity';
import axios from 'axios';
import { environment } from '@environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl = `${environment.apiUrl}/login`;
  signUpUrl = `${environment.apiUrl}/auth`;

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

  async signupUser(
    signupForm: Partial<{
      email: string | null;
      name: string | null;
      userName: string | null;
      password: string | null;
      securityQuestion: string | null;
      answer: string | null;
    }>
  ) {
    console.log(signupForm);
    const requestBody = {
      email: signupForm.email,
      name: signupForm.name,
      userName: signupForm.userName,
      password: signupForm.password,
    };
    try {
      const response = await axios.post(this.signUpUrl, requestBody);
      return response;
    } catch (error) {
      return error;
    }
  }
}
