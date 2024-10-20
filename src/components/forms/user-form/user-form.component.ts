import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUserDto, UserDto } from '@entities/User.entity';
import { UserService } from '@services/user/user.service';
import { AxiosError } from 'axios';
import { ToastrService } from 'ngx-toastr';
import { FormWrapperComponent } from "../form-wrapper/form-wrapper.component";
import { TextFieldComponent } from "../form-fields/text-field/text-field.component";
import { EmailFieldComponent } from "../form-fields/email-field/email-field.component";
import { PrimaryButtonComponent } from "../../buttons/primary-button/primary-button.component";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormWrapperComponent, TextFieldComponent, EmailFieldComponent, PrimaryButtonComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() userData: any = null;
  @Input() onFinish?: () => Promise<void>;

  userService: UserService = inject(UserService);
  toastr: ToastrService = inject(ToastrService);

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnChanges() {
    this.handleProductDataOnChange();
  }

  handleProductDataOnChange() {
    this.userForm.setValue({
      email: this.userData?.email || '',
      name: this.userData?.name || '',
      userName: this.userData?.userName || '',
      password: this.userData?.password || '',
    });
  }

  async handleActionButton(event: FormGroup) {
    this.handleCreate(event);
  }

  async handleCreate(event: FormGroup) {
    const requestBody: CreateUserDto = {
      email: event.value.email,
      name: event.value.name,
      userName: event.value.userName,
      password: event.value.password,
      role: 'Employee',
    };

    
    this.userService.createEmployee(requestBody).subscribe({
      next: (value: UserDto) =>{
        this.toastr.success('User added successfully');
        event.reset();

      },
      error: (error)=>{
        if(error instanceof HttpErrorResponse && error.statusText=='Unauthorized'){
          this.toastr.error('You have to log in');
        } 
        error.error.Message ? this.toastr.error(error.error.Message) : this.toastr.error('Unexpected error occurred') 
      }
    })
  }



}
