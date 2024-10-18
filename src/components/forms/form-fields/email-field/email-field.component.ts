import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { basicErrorMessage } from 'src/validators/error-messages';

@Component({
  selector: 'app-email-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './email-field.component.html',
  styleUrl: './email-field.component.css',
})
export class EmailFieldComponent {
  @Input() label = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() formGroup!: FormGroup;
  @Input() control: AbstractControl | null = null;

  get errorMessage(): string | null {
    return basicErrorMessage(this.control);
  }
}
