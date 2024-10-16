import { Component, inject } from '@angular/core';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { ProductService } from '@services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductEntity } from '@entities/Product.entity';
import { AxiosError } from 'axios';
import { ModalComponent } from '@components/modal/modal.component';
import { ActionButtonComponent } from '../../components/buttons/action-button/action-button.component';
import { SignupFormComponent } from '../../components/signup-form/signup-form.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CustomTableComponent,
    LoaderComponent,
    ModalComponent,
    ActionButtonComponent,
    SignupFormComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  isLoading = true;
  isModalActive = false;
  selectedProduct: { value: string; type: string } | null = null;
  productService: ProductService = inject(ProductService);
  toastr: ToastrService = inject(ToastrService);
  rows = ['ID', 'NAME', 'CATEGORY', 'PRICE', 'DESCRIPTION', 'INVENTORY'];
  productsList: Partial<ProductEntity>[] = [];

  transformProducts(products: ProductEntity[]) {
    return products.map((i) => {
      return {
        id: i.id,
        name: i.title,
        category: i.category,
        price: i.price,
        description: i.description,
        inventory: i.stock,
      };
    });
  }

  async getProductsList() {
    const products: ProductEntity[] | AxiosError =
      await this.productService.getAll();
    if ('message' in products) {
      this.toastr.error(products.message, 'Error');
    } else {
      const transformedProducts = this.transformProducts(products);
      this.productsList = transformedProducts;
    }
    this.isLoading = false;
  }

  async deleteProduct(val: string) {
    console.log(`deleted ${val}`);
    this.closeModal();
  }

  handleOptionClick(event: any) {
    this.isModalActive = true;
    this.selectedProduct = event;
  }

  closeModal() {
    this.isModalActive = false;
    this.selectedProduct = null;
  }

  ngOnInit() {
    this.getProductsList();
  }
}
