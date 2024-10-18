import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WhiteButtonComponent } from '@components/white-button/white-button.component';
import { ProductByIdDto } from '@entities/Product.entity';
import { PrimaryButtonComponent } from "../buttons/primary-button/primary-button.component";
import { CounterComponent } from '@components/counter/counter.component';

@Component({
  selector: 'app-productdetail-description',
  standalone: true,
  imports: [CurrencyPipe, WhiteButtonComponent, PrimaryButtonComponent, CounterComponent],
  templateUrl: './productdetail-description.component.html',
  styleUrl: './productdetail-description.component.css'
})
export class ProductdetailDescriptionComponent {
  @Input() productEntity?: ProductByIdDto;
  currentValue: number =0;
  getCurrentValue(event: number){
    this.currentValue = event;
  }

}
