import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { basicErrorMessage } from 'src/validators/error-messages';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.css',
})
export class PasswordFieldComponent {
  @Input() label = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() formGroup!: FormGroup;
  @Input() control: AbstractControl | null = null;

  eyeOpenIcon = 'icons/eyeOpen.svg';
  eyeClosedIcon = 'icons/eyeClosed.svg';
  isPasswordVisible = false;

  handleShowPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  getPasswordIcon() {
    if (this.isPasswordVisible) {
      return this.eyeClosedIcon;
    }
    return this.eyeOpenIcon;
  }

  get errorMessage(): string | null {
    return basicErrorMessage(this.control);
  }
}
