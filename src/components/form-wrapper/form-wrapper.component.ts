import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Form, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PrimaryButtonComponent } from '../buttons/primary-button/primary-button.component';

@Component({
  selector: 'app-form-wrapper',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PrimaryButtonComponent],
  templateUrl: './form-wrapper.component.html',
  styleUrl: './form-wrapper.component.css',
})
export class FormWrapperComponent {
  @Input() formGroup!: FormGroup;
  @Output() onSubmit = new EventEmitter<FormGroup>();

  handleSubmit() {
    this.onSubmit.emit(this.formGroup);
  }
}
