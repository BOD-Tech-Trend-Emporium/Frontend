import { Component, inject, OnInit } from '@angular/core';
import { CategoryDto } from '@entities/Category.entity';
import { CategoryService } from '@services/category/category.service';
import { CarouselImagenComponent } from "../carousel-imagen/carousel-imagen.component";

@Component({
  selector: 'app-landingpage-category',
  standalone: true,
  imports: [CarouselImagenComponent],
  templateUrl: './landingpage-category.component.html',
  styleUrl: './landingpage-category.component.css'
})
export class LandingpageCategoryComponent implements OnInit{
  private categoryService: CategoryService = inject(CategoryService);
  categoriesWithMostProducts: CategoryDto[]=[];
  ngOnInit(): void {

    this.categoryService.getCategoriesWithMostProducts().subscribe({
      next: (category: CategoryDto[])=>{
        this.categoriesWithMostProducts = category;
      },
      error: (error: any)=>{}
    });

  }
}
