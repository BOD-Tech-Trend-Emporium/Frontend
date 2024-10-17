import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextFieldComponent } from '@components/form-fields/text-field/text-field.component';
import { PrimaryButtonComponent } from '../buttons/primary-button/primary-button.component';
import { FormWrapperComponent } from '../form-wrapper/form-wrapper.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextFieldComponent,
    PrimaryButtonComponent,
    FormWrapperComponent,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  productForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    inventory: new FormControl(''),
  });

  async handleCreate(event: FormGroup) {
    console.log(event.value);
    event.reset();
  }
}
