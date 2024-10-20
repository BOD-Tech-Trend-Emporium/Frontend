import { Component } from '@angular/core';
import { ProductFormComponent } from "../../components/forms/product-form/product-form.component";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {

}
