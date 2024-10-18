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
  currentValue:number = 0;
  @Input() maxValue?: number =10;
  @Input() minValue: number = 0;
  disableIncrement: boolean = false;
  disableDecrement: boolean = true;

  increase(){
    if(this.maxValue){
      this.disableIncrement = this.currentValue +1 > this.maxValue ? true : false
      this.currentValue = this.disableIncrement ? this.currentValue : this.currentValue+1;
      this.disableDecrement = false;
      this.valueEmitter.emit(this.currentValue);
    }

  }
  decrease(){
    this.disableDecrement = this.currentValue -1 < this.minValue ? true : false
    this.currentValue = this.disableDecrement ? this.currentValue : this.currentValue-1;
    this.disableIncrement = false;
    this.valueEmitter.emit(this.currentValue);
  }

}
