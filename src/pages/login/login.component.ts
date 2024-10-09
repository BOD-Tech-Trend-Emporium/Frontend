import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthBannerComponent } from '../../components/auth-banner/auth-banner.component';
import { AuthComponent } from '../../layouts/auth/auth.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, AuthBannerComponent, AuthComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
