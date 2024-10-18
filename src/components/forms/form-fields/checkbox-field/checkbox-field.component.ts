import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkbox-field.component.html',
  styleUrl: './checkbox-field.component.css',
})
export class CheckboxFieldComponent {
  @Input() label = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() formGroup!: FormGroup;
}
