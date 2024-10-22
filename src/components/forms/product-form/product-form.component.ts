import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextFieldComponent } from '@components/forms/form-fields/text-field/text-field.component';
import { PrimaryButtonComponent } from '../../buttons/primary-button/primary-button.component';
import { ProductEntity } from '@entities/Product.entity';
import { FormWrapperComponent } from '../form-wrapper/form-wrapper.component';
import { ProductService } from '@services/product/product.service';
import { AxiosError } from 'axios';
import { ToastrService } from 'ngx-toastr';
import { SelectFieldComponent } from '../form-fields/select-field/select-field.component';
import { CategoryService } from '@services/category/category.service';
import { CategoryEntity } from '@entities/Category.entity';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextFieldComponent,
    PrimaryButtonComponent,
    FormWrapperComponent,
    SelectFieldComponent,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  @Input() productData: any = null;
  @Input() onFinish?: () => Promise<void>;

  productService: ProductService = inject(ProductService);
  toastr: ToastrService = inject(ToastrService);
  categoryService: CategoryService = inject(CategoryService);

  categories = [
    {
      value: 'value',
      name: 'Select a value',
    },
  ];

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    inventory: new FormControl('', [Validators.required]),
  });

  ngOnChanges() {
    this.handleProductDataOnChange();
  }

  ngOnInit() {
    this.getCategories();
  }

  transformCategories = (categories: CategoryEntity[]) => {
    return categories.map((i: CategoryEntity) => {
      return {
        value: i.id.toString(),
        name: i.name,
      };
    });
  };

  async getCategories() {
    const response = await this.categoryService.getAll();
    if ('message' in response) {
      this.toastr.error(response.message, 'Error');
    } else {
      const transformedCategories = this.transformCategories(response);
      this.categories = transformedCategories;
    }
  }

  getCategoryFromName(name: string) {
    return this.categories.find((i) => i.name === name)?.value;
  }

  handleProductDataOnChange() {
    console.log(this.productData);
    this.productForm.setValue({
      title: this.productData?.name || '',
      price: this.productData?.price || '',
      category: this.getCategoryFromName(this.productData?.category) || '',
      description: this.productData?.description || '',
      image: this.productData?.image || '',
      inventory: this.productData?.inventory || '',
    });
  }

  async handleActionButton(event: FormGroup) {
    if (this.productData) {
      this.handleEdit(event);
    } else {
      this.handleCreate(event);
    }
  }

  async handleCreate(event: FormGroup) {
    const requestBody: Partial<ProductEntity> = {
      title: event.value.title,
      price: event.value.price,
      description: event.value.description,
      category: event.value.category,
      image: event.value.image,
      stock: event.value.inventory,
    };
    const response: string | AxiosError =
      await this.productService.createProduct(requestBody);
    if (typeof response === 'object') {
      this.toastr.error(response.message, 'Error');
    } else {
      this.toastr.success('Product created');
      event.reset();
    }
  }

  async handleEdit(event: FormGroup) {
    const requestBody: Partial<ProductEntity> = {
      title: event.value.title,
      price: event.value.price,
      description: event.value.description,
      category: event.value.category,
      image: event.value.image,
      stock: event.value.inventory,
    };
    const response: string | AxiosError = await this.productService.editProduct(
      requestBody,
      this.productData.id
    );
    if (typeof response === 'object') {
      this.toastr.error(response.message, 'Error');
    } else {
      this.toastr.success('Product updated');
      event.reset();
      if (this.onFinish) {
        this.onFinish();
      }
    }
  }
}
