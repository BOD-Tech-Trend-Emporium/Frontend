import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-wrapper',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-wrapper.component.html',
  styleUrl: './form-wrapper.component.css',
})
export class FormWrapperComponent {
  @Input() formGroup!: FormGroup;
  @Input() onSubmit!: any;
}
