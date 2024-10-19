import { Component, inject, Input } from '@angular/core';
import { FormWrapperComponent } from "../form-wrapper/form-wrapper.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryEntity, CreateCategoryDto, UpdateCategoryByIdResponseDto, UpdateCategoryDto } from '@entities/Category.entity';
import { CategoryService } from '@services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { TextFieldComponent } from "../form-fields/text-field/text-field.component";
import { PrimaryButtonComponent } from "../../buttons/primary-button/primary-button.component";

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormWrapperComponent, TextFieldComponent, PrimaryButtonComponent],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  @Input() categoryData: any = null;
  @Input() onFinish?: () => Promise<void>;

  categoryService: CategoryService = inject(CategoryService);
  toastr: ToastrService = inject(ToastrService);


  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  ngOnChanges() {
    this.handleProductDataOnChange();
  }

  handleProductDataOnChange() {
    this.categoryForm.setValue({
      name: this.categoryData?.name || '',
    });
  }

  handleActionButton(event: FormGroup) {
    if(this.categoryData){

    }
    else{
      this.handleCreate(event);
    }
  }

  handleCreate(event: FormGroup) {

    const requestBody: CreateCategoryDto = {
      name: event.value.name,
    };

    this.categoryService.createCategory(requestBody).subscribe({
      next: (value: CategoryEntity) =>{
        this.toastr.success('Category added successfully');
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

  handleEdit(event: FormGroup){
    const requestBody: UpdateCategoryDto = {
      name: event.value.name,
    };
    this.categoryService.updateCategory(requestBody, this.categoryData.id).subscribe({
      next: (data: UpdateCategoryByIdResponseDto)=>{
        this.toastr.success('Category updated successfully');
        event.reset();
        if (this.onFinish) {
          this.onFinish();
        }
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
