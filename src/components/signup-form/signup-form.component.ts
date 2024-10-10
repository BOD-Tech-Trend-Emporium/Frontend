import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { TextFieldComponent } from '../form-fields/text-field/text-field.component';
import {
  lowerCaseValidator,
  numberValidator,
  passwordsMatchValidator,
  specialCharValidator,
  upperCaseValidator,
} from 'src/validators/validators';

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
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  options = [
    { value: '1', name: "Pet's name" },
    { value: '2', name: 'Nickname' },
  ];

  signupForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
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

  handleSignup() {
    console.log(this.signupForm.value);
  }
}
