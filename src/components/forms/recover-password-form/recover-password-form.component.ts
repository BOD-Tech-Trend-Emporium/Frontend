import { Component, inject } from '@angular/core';
import { FormWrapperComponent } from '../form-wrapper/form-wrapper.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailFieldComponent } from '../form-fields/email-field/email-field.component';
import { PasswordFieldComponent } from '../form-fields/password-field/password-field.component';
import { SelectFieldComponent } from '../form-fields/select-field/select-field.component';
import { TextFieldComponent } from '../form-fields/text-field/text-field.component';
import { LoaderButtonComponent } from '../../buttons/loader-button/loader-button.component';
import { PrimaryButtonComponent } from '../../buttons/primary-button/primary-button.component';
import { RouterLink } from '@angular/router';
import {
  lowerCaseValidator,
  numberValidator,
  specialCharValidator,
  upperCaseValidator,
} from 'src/validators/validators';
import { AuthService } from '@services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RecoverPasswordEntity } from '@entities/RecoverPassword.entity';

@Component({
  selector: 'app-recover-password-form',
  standalone: true,
  imports: [
    FormWrapperComponent,
    EmailFieldComponent,
    PasswordFieldComponent,
    SelectFieldComponent,
    TextFieldComponent,
    LoaderButtonComponent,
    PrimaryButtonComponent,
    RouterLink,
  ],
  templateUrl: './recover-password-form.component.html',
  styleUrl: './recover-password-form.component.css',
})
export class RecoverPasswordFormComponent {
  isLoading = false;
  recoverPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      upperCaseValidator,
      lowerCaseValidator,
      numberValidator,
      specialCharValidator,
    ]),
    securityQuestion: new FormControl('', [Validators.required]),
    securityQuestionAnswer: new FormControl('', [Validators.required]),
  });
  authService: AuthService = inject(AuthService);
  toastr: ToastrService = inject(ToastrService);

  options = [
    { value: '0', name: 'What was the name of your first pet?' },
    { value: '1', name: 'What is the name of the street where you grew up?' },
    { value: '2', name: 'What was your childhood nickname?' },
    { value: '3', name: 'What is your mother’s maiden name?' },
    { value: '4', name: 'What was the model of your first car?' },
  ];

  async handleRecoverPassword(event: FormGroup) {
    this.isLoading = true;
    const request: RecoverPasswordEntity = {
      email: event.value.email!,
      password: event.value.newPassword!,
      securityQuestionAnswer: event.value.securityQuestionAnswer,
      securityQuestion: event.value.securityQuestion,
    };
    const response: any = await this.authService.recoverPassword(request);
    console.log(response);
    if (response.data) {
      this.toastr.success(`Password reseted`);
      event.reset();
    } else {
      this.toastr.error(response.response.data.Message, 'Error');
    }
    this.isLoading = false;
  }
}
