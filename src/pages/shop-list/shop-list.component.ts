import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ActionButtonComponent } from '../../components/buttons/action-button/action-button.component';

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
    ActionButtonComponent,
  ],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.css',
})
export class ShopListComponent {
  currentPage = 1;
  isLoading = false;
  isLoadingNewContent = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  categoryService: CategoryService = inject(CategoryService);
  productService: ProductService = inject(ProductService);
  toastr: ToastrService = inject(ToastrService);
  categories = [
    {
      value: '',
      name: 'Select a category',
    },
  ];
  productsList: ProductEntity[] = [];
  filterForm = new FormGroup({
    category: new FormControl(''),
    minPrice: new FormControl(''),
    maxPrice: new FormControl(''),
  });

  ngOnInit() {
    this.productsList = [];
    this.getCategories();
    this.handleSearchItem();
  }

  handleSearchItem() {
    this.route.queryParams.subscribe((params) => {
      const title = params['title'] || '';
      this.searchProducts(title);
    });
  }

  transformCategories = (categories: CategoryEntity[]) => {
    return categories.map((i: CategoryEntity) => {
      return {
        value: i.name,
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
      this.categories.push(...transformedCategories);
    }
  }

  async searchProducts(title: string = '') {
    let query = `${this.getQueryFromForm(this.filterForm.value)}`;
    if (title !== '') {
      query += `title=${title}`;
    }
    this.isLoading = true;
    const products: ProductEntity[] | AxiosError =
      await this.productService.searchProducts(
        query,
        title ? 1 : this.currentPage
      );
    if ('message' in products) {
      this.toastr.error(products.message, 'Error');
    } else {
      if (title !== '') {
        this.productsList = products;
      } else {
        this.productsList.push(...products);
      }
    }
    this.isLoading = false;
  }

  async handleSearchMoreProducts() {
    this.isLoadingNewContent = true;
    this.currentPage += 1;
    await this.searchProducts();
    this.isLoadingNewContent = false;
  }

  getQueryFromForm(
    formValue: Partial<{
      category: string | null;
      minPrice: string | null;
      maxPrice: string | null;
    }>
  ) {
    let query = '';
    if (formValue.category) {
      query += `category=${formValue.category}&`;
    }
    if (formValue.minPrice) {
      query += `minPrice=${formValue.minPrice}&`;
    }
    if (formValue.maxPrice) {
      query += `maxPrice=${formValue.maxPrice}&`;
    }
    return query;
  }

  async clearFilters() {
    this.filterForm.setValue({
      category: '',
      minPrice: '',
      maxPrice: '',
    });
    this.currentPage = 1;
    await this.searchProducts();
    this.productsList = [];
    this.router.navigate(['/shoplist']);
  }

  async handleFilter() {
    this.currentPage = 1;
    this.productsList = [];
    await this.searchProducts();
  }
}
