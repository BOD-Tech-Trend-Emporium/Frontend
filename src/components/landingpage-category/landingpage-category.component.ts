import { Component, inject, OnInit } from '@angular/core';
import { CategoryDto } from '@entities/Category.entity';
import { CategoryService } from '@services/category/category.service';
import { BasicImagenComponent } from "../basic-imagen/basic-imagen.component";
import { WhiteButtonComponent } from '@components/white-button/white-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landingpage-category',
  standalone: true,
  imports: [BasicImagenComponent, WhiteButtonComponent, RouterLink],
  templateUrl: './landingpage-category.component.html',
  styleUrl: './landingpage-category.component.css'
})
export class LandingpageCategoryComponent implements OnInit{
  private categoryService: CategoryService = inject(CategoryService);
  categoriesWithMostProducts: CategoryDto[]=[];
  isLoading = true;

  ngOnInit(): void {

    this.categoryService.getCategoriesWithMostProducts().subscribe({
      next: (category: CategoryDto[])=>{
        this.categoriesWithMostProducts = category;
        this.isLoading = false;
      },
      error: (error: any)=>{
        this.isLoading = false;
        //console.log(error);
      }
    });

  }
}
