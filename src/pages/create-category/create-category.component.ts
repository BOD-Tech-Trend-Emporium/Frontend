import { Component } from '@angular/core';
import { CategoryFormComponent } from "../../components/forms/category-form/category-form.component";

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CategoryFormComponent],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {

}
