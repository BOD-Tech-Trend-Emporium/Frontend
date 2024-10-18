import { Component, inject } from '@angular/core';
import { CategoryEntity } from '@entities/Category.entity';
import { CategoryService } from '@services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { AxiosError } from 'axios';
import { ModalComponent } from '../../components/modal/modal.component';
import { ActionButtonComponent } from '../../components/buttons/action-button/action-button.component';
import { SignupFormComponent } from '../../components/forms/signup-form/signup-form.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    LoaderComponent,
    CustomTableComponent,
    ModalComponent,
    ActionButtonComponent,
    SignupFormComponent,
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent {
  isLoading: boolean = false;
  isModalActive: boolean = false;
  selectedCategory: { value: CategoryEntity; type: string } | null = null;
  categoriesService: CategoryService = inject(CategoryService);
  toastr: ToastrService = inject(ToastrService);
  rows = ['ID', 'NAME'];
  categoriesList: Partial<CategoryEntity>[] = [];

  transformCategories(categories: CategoryEntity[]) {
    return categories.map((i) => {
      return {
        id: i.id,
        name: i.name,
      };
    });
  }

  async getCategoriesList() {
    const users: CategoryEntity[] | AxiosError =
      await this.categoriesService.getAll();
    if ('message' in users) {
      this.toastr.error(users.message, 'Error');
    } else {
      const transformedProducts = this.transformCategories(users);
      this.categoriesList = transformedProducts;
    }
    this.isLoading = false;
  }

  async deleteProduct(val: string) {
    console.log(`deleted ${val}`);
    this.closeModal();
  }

  handleOptionClick(event: any) {
    this.isModalActive = true;
    this.selectedCategory = event;
  }

  closeModal() {
    this.isModalActive = false;
    this.selectedCategory = null;
  }

  ngOnInit() {
    this.getCategoriesList();
  }
}
