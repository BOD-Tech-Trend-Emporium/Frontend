import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { basicErrorMessage } from 'src/validators/error-messages';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.css',
})
export class SelectFieldComponent {
  @Input() label = '';
  @Input() name = '';
  @Input() formGroup!: FormGroup;
  @Input() options: { value: string; name: string }[] = [];
  @Input() control: AbstractControl | null = null;

  get errorMessage(): string | null {
    return basicErrorMessage(this.control);
  }
}
