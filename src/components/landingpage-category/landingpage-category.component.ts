import { Component, inject, OnInit } from '@angular/core';
import { CategoryEntity } from '@entities/Category.entity';
import { CategoryService } from '@services/category/category.service';
import { BasicImagenComponent } from '../basic-imagen/basic-imagen.component';
import { WhiteButtonComponent } from '@components/white-button/white-button.component';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landingpage-category',
  standalone: true,
  imports: [BasicImagenComponent, WhiteButtonComponent, RouterLink],
  templateUrl: './landingpage-category.component.html',
  styleUrl: './landingpage-category.component.css',
})
export class LandingpageCategoryComponent implements OnInit {
  private categoryService: CategoryService = inject(CategoryService);
  categoriesWithMostProducts: CategoryEntity[] = [];
  isLoading = true;
  toastr: ToastrService = inject(ToastrService);

  ngOnInit(): void {
    this.categoryService.getCategoriesWithMostProducts().subscribe({
      next: (category: CategoryEntity[]) => {
        this.categoriesWithMostProducts = category;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.toastr.error('Connection error when fetching categories');
        this.isLoading = false;
      },
    });
  }
}
