import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import {
  lowerCaseValidator,
  numberValidator,
  specialCharValidator,
  upperCaseValidator,
} from 'src/validators/validators';

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
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    save: new FormControl(false),
  });

  handleLogin() {
    console.log(this.loginForm.value);
  }
}
