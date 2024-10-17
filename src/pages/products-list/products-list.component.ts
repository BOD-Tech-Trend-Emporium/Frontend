import { Component, inject } from '@angular/core';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { ProductService } from '@services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductEntity } from '@entities/Product.entity';
import { AxiosError } from 'axios';
import { ModalComponent } from '@components/modal/modal.component';
import { ActionButtonComponent } from '../../components/buttons/action-button/action-button.component';
import { SignupFormComponent } from '../../components/forms/signup-form/signup-form.component';
import { ProductFormComponent } from '../../components/forms/product-form/product-form.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CustomTableComponent,
    LoaderComponent,
    ModalComponent,
    ActionButtonComponent,
    SignupFormComponent,
    ProductFormComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  isLoading = true;
  isModalActive = false;
  selectedProduct: { value: ProductEntity; type: string } | null = null;
  productService: ProductService = inject(ProductService);
  toastr: ToastrService = inject(ToastrService);
  rows = [
    'ID',
    'NAME',
    'IMAGE',
    'CATEGORY',
    'PRICE',
    'DESCRIPTION',
    'INVENTORY',
  ];
  productsList: Partial<ProductEntity>[] = [];

  ngOnInit() {
    this.getProductsList();
  }

  transformProducts(products: ProductEntity[]) {
    return products.map((i) => {
      return {
        id: i.id,
        name: i.title,
        image: i.image,
        category: i.category,
        price: i.price,
        description: i.description,
        inventory: i.stock,
      };
    });
  }

  closeModal() {
    this.isModalActive = false;
    this.selectedProduct = null;
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
    const productToDelete = JSON.parse(val);
    this.toastr.success('Product deleted');
    this.productsList = this.productsList.filter(
      (i) => i.id !== productToDelete.id
    );
    this.closeModal();
  }

  editProduct = async () => {
    this.closeModal();
    this.getProductsList();
  };

  handleOptionClick(event: any) {
    this.isModalActive = true;
    this.selectedProduct = event;
  }
}
