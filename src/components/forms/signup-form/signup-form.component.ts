import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PasswordFieldComponent } from '../form-fields/password-field/password-field.component';
import { EmailFieldComponent } from '../form-fields/email-field/email-field.component';
import { SelectFieldComponent } from '../form-fields/select-field/select-field.component';
import { PrimaryButtonComponent } from '../../buttons/primary-button/primary-button.component';
import { TextFieldComponent } from '../form-fields/text-field/text-field.component';
import {
  lowerCaseValidator,
  numberValidator,
  passwordsMatchValidator,
  specialCharValidator,
  upperCaseValidator,
} from 'src/validators/validators';
import { AuthService } from '@services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderButtonComponent } from '../../buttons/loader-button/loader-button.component';
import { SignUpEntity } from '@entities/Signup.entity';
import { FormWrapperComponent } from '../form-wrapper/form-wrapper.component';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    PasswordFieldComponent,
    EmailFieldComponent,
    SelectFieldComponent,
    PrimaryButtonComponent,
    TextFieldComponent,
    LoaderButtonComponent,
    FormWrapperComponent,
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  isLoading = false;
  authService: AuthService = inject(AuthService);
  toastr: ToastrService = inject(ToastrService);

  options = [
    { value: '0', name: 'What was the name of your first pet?' },
    { value: '1', name: 'What is the name of the street where you grew up?' },
    { value: '2', name: 'What was your childhood nickname?' },
    { value: '3', name: 'What is your mother’s maiden name?' },
    { value: '4', name: 'What was the model of your first car?' },
  ];

  signupForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        upperCaseValidator,
        lowerCaseValidator,
        numberValidator,
        specialCharValidator,
      ]),
      repeatPassword: new FormControl('', [Validators.required]),
      securityQuestion: new FormControl('', [Validators.required]),
      answer: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    },
    { validators: passwordsMatchValidator }
  );

  async handleSignup(event: FormGroup) {
    this.isLoading = true;
    const request: SignUpEntity = {
      email: event.value.email!,
      name: event.value.name!,
      userName: event.value.userName!,
      password: event.value.password!,
      securityQuestion: event.value.securityQuestion!,
      securityQuestionAnswer: event.value.answer!,
    };
    const response: any = await this.authService.signup(request);
    if (response.data) {
      this.toastr.success(`Account created successfully`);
      event.reset();
    } else {
      this.toastr.error(response.response.data.Message, 'Error');
    }
    this.isLoading = false;
  }
}
