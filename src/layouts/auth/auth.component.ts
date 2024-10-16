import { Component } from '@angular/core';
import { AuthBannerComponent } from '../../components/auth-banner/auth-banner.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AuthBannerComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {}
