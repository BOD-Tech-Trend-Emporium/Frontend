import { Component} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { LandingpageArrivalsComponent } from "../../components/landingpage-arrivals/landingpage-arrivals.component";
import { LandingpageBestSellingProductsComponent } from "../../components/landingpage-best-selling-products/landingpage-best-selling-products.component";
import { LandingpageCategoryComponent } from "../../components/landingpage-category/landingpage-category.component";

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [LandingpageArrivalsComponent, CurrencyPipe, LandingpageBestSellingProductsComponent, LandingpageCategoryComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent{

}
