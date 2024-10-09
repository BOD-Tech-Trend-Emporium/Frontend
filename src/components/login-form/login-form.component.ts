import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  eyeOpenIcon = 'icons/eyeOpen.svg';
  eyeClosedIcon = 'icons/eyeClosed.svg';
  isPasswordVisible = false;
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    save: new FormControl(false),
  });

  handleLogin() {
    console.log(this.loginForm.value);
  }

  handleShowPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  getPasswordIcon() {
    if (this.isPasswordVisible) {
      return this.eyeClosedIcon;
    }
    return this.eyeOpenIcon;
  }
}
