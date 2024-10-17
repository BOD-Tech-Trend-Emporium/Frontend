import { Component, inject } from '@angular/core';
import { CategoryEntity } from '@entities/Category.entity';
import { CategoryService } from '@services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { AxiosError } from 'axios';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [LoaderComponent, CustomTableComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent {
  isLoading: boolean = false;
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

  ngOnInit() {
    this.getCategoriesList();
  }
}
