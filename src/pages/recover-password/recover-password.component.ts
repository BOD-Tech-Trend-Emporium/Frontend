import { Component } from '@angular/core';
import { AuthComponent } from '../../layouts/auth/auth.component';
import { RecoverPasswordFormComponent } from '../../components/forms/recover-password-form/recover-password-form.component';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [AuthComponent, RecoverPasswordFormComponent],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css',
})
export class RecoverPasswordComponent {}
