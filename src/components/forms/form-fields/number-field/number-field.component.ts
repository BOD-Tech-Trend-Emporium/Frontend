import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { basicErrorMessage } from 'src/validators/error-messages';

@Component({
  selector: 'app-number-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './number-field.component.html',
  styleUrl: './number-field.component.css',
})
export class NumberFieldComponent {
  @Input() label = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() formGroup!: FormGroup;
  @Input() control: AbstractControl | null = null;

  get errorMessage(): string | null {
    return basicErrorMessage(this.control);
  }
}
