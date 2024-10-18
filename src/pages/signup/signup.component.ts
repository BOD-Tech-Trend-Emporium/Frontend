import { Component } from '@angular/core';
import { AuthComponent } from '../../layouts/auth/auth.component';
import { SignupFormComponent } from '../../components/forms/signup-form/signup-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AuthComponent, SignupFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {}
