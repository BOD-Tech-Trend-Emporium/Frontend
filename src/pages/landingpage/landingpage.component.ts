import { Component} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { LandingpageArrivalsComponent } from "../../components/landingpage-arrivals/landingpage-arrivals.component";
import { LandingpageBestSellingProductsComponent } from "../../components/landingpage-best-selling-products/landingpage-best-selling-products.component";
import { LandingpageCategoryComponent } from "../../components/landingpage-category/landingpage-category.component";
import { CarouselComponent } from '@components/carousel/carousel.component';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [LandingpageArrivalsComponent, CurrencyPipe, LandingpageBestSellingProductsComponent, LandingpageCategoryComponent, CarouselComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent{
  carouselImage:string[] =["https://cdn.pixabay.com/photo/2024/04/11/16/20/business-8690142_1280.jpg","https://cdn.pixabay.com/photo/2024/03/26/11/57/e-commerce-8656646_1280.jpg"];
}
