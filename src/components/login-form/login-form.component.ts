import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TextFieldComponent } from '../form-fields/text-field/text-field.component';
import { PasswordFieldComponent } from '../form-fields/password-field/password-field.component';
import { CheckboxFieldComponent } from '../form-fields/checkbox-field/checkbox-field.component';
import { FormWrapperComponent } from '../form-wrapper/form-wrapper.component';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { AuthService } from '@services/auth/auth.service';
import { EmailFieldComponent } from '../form-fields/email-field/email-field.component';
import { ToastrService } from 'ngx-toastr';
import { LoaderButtonComponent } from '../loader-button/loader-button.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TextFieldComponent,
    PasswordFieldComponent,
    CheckboxFieldComponent,
    FormWrapperComponent,
    PrimaryButtonComponent,
    EmailFieldComponent,
    LoaderButtonComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  isLoading = false;
  authService: AuthService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    save: new FormControl(false),
  });

  constructor(private toastr: ToastrService) {}

  async handleLogin() {
    this.isLoading = true;
    const response: any = await this.authService.loginUser(
      this.loginForm.value
    );
    if (response.data) {
      this.toastr.success(`Welcome back ${response.data.userName}`);
    } else {
      this.toastr.error(response.response.data.Message, 'Error');
    }
    this.isLoading = false;
  }
}
