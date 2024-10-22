import { Component } from '@angular/core';
import { UserFormComponent } from "../../components/forms/user-form/user-form.component";

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {

}
