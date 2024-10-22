import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, output, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [NgClass],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Output() valueEmitter = new EventEmitter<number>();
  currentValue:number = 1;
  @Input() maxValue?: number =10;
  @Input() minValue: number = 1;
  disableIncrement: boolean = false;
  disableDecrement: boolean = true;

  increase(){
    if (this.maxValue !== undefined && this.currentValue < this.maxValue) {
      this.currentValue++;
      this.disableIncrement = this.currentValue >= this.maxValue;
      this.disableDecrement = false;
      this.valueEmitter.emit(this.currentValue);
    }

  }
  decrease(){
    if (this.currentValue > this.minValue) {
      this.currentValue--;
      this.disableDecrement = this.currentValue <= this.minValue;
      this.disableIncrement = false;
      this.valueEmitter.emit(this.currentValue);
    }
  }

}
