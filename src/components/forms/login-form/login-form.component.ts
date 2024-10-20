import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TextFieldComponent } from '../form-fields/text-field/text-field.component';
import { PasswordFieldComponent } from '../form-fields/password-field/password-field.component';
import { CheckboxFieldComponent } from '../form-fields/checkbox-field/checkbox-field.component';
import { PrimaryButtonComponent } from '../../buttons/primary-button/primary-button.component';
import { AuthService } from '@services/auth/auth.service';
import { EmailFieldComponent } from '../form-fields/email-field/email-field.component';
import { ToastrService } from 'ngx-toastr';
import { LoaderButtonComponent } from '../../buttons/loader-button/loader-button.component';
import { LoginEntity } from '@entities/Login.entity';
import { FormWrapperComponent } from '../form-wrapper/form-wrapper.component';
import { environment } from '@environments/environment.local';

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
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    save: new FormControl(false),
  });

  async handleLogin(event: FormGroup) {
    this.isLoading = true;
    const request: LoginEntity = {
      email: event.value.email!,
      password: event.value.password!,
      save: event.value.save!,
    };
    const response: any = await this.authService.login(request);
    if (response.data) {
      this.toastr.success(`Welcome back ${response.data.userName}`);
      event.reset();
      if (!request.save) {
        window.addEventListener('beforeunload', function (event) {
          event.preventDefault();
          fetch(`${environment.apiUrl}/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${response.data.token}`,
            },
            body: '',
            keepalive: true,
          });
        });
      }
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1500);
    } else {
      this.toastr.error(response.response.data.Message, 'Error');
    }
    this.isLoading = false;
  }
}
