import { Component } from '@angular/core';
import { ShoppingCartDetailComponent } from "../../components/shopping-cart-detail/shopping-cart-detail.component";
import { OrderSummaryComponent } from "../../components/order-summary/order-summary.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ShoppingCartDetailComponent, OrderSummaryComponent, FooterComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

}
