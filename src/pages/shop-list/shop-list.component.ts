import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectFieldComponent } from '../../components/forms/form-fields/select-field/select-field.component';
import { NumberFieldComponent } from '../../components/forms/form-fields/number-field/number-field.component';
import { CategoryService } from '@services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { PrimaryButtonComponent } from '../../components/buttons/primary-button/primary-button.component';
import { CategoryEntity } from '@entities/Category.entity';
import { ProductEntity } from '@entities/Product.entity';
import { AxiosError } from 'axios';
import { ProductService } from '@services/product/product.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { BasicImagenComponent } from '../../components/basic-imagen/basic-imagen.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SelectFieldComponent,
    NumberFieldComponent,
    PrimaryButtonComponent,
    LoaderComponent,
    BasicImagenComponent,
    RouterLink,
    CurrencyPipe,
  ],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.css',
})
export class ShopListComponent {
  isLoading = true;
  categoryService: CategoryService = inject(CategoryService);
  productService: ProductService = inject(ProductService);
  toastr: ToastrService = inject(ToastrService);
  categories = [
    {
      value: 'value',
      name: 'Select a value',
    },
  ];
  productsList: ProductEntity[] = [];
  filterForm = new FormGroup({
    category: new FormControl(''),
    minPrice: new FormControl(''),
    maxPrice: new FormControl(''),
  });

  ngOnInit() {
    this.getCategories();
    this.searchProducts();
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

  async searchProducts() {
    this.isLoading = true;
    const products: ProductEntity[] | AxiosError =
      await this.productService.searchProducts();
    if ('message' in products) {
      this.toastr.error(products.message, 'Error');
    } else {
      this.productsList = products;
    }
    this.isLoading = false;
    console.log(this.productsList);
  }

  handleFilter() {
    console.log(this.filterForm.value);
  }
}
