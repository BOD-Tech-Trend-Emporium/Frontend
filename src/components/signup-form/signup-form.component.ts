import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  eyeOpenIcon = 'icons/eyeOpen.svg';
  eyeClosedIcon = 'icons/eyeClosed.svg';
  isPasswordVisible = false;
  isRepeatPasswordVisible = false;
  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
    securityQuestion: new FormControl(''),
    answer: new FormControl(''),
  });

  handleSignup() {
    console.log(this.signupForm.value);
  }

  handleShowPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  handleShowRepeatPassword() {
    this.isRepeatPasswordVisible = !this.isRepeatPasswordVisible;
  }

  getPasswordIcon() {
    if (this.isPasswordVisible) {
      return this.eyeClosedIcon;
    }
    return this.eyeOpenIcon;
  }

  getRepeatPasswordIcon() {
    if (this.isRepeatPasswordVisible) {
      return this.eyeClosedIcon;
    }
    return this.eyeOpenIcon;
  }
}
