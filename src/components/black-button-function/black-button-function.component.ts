import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-black-button-function',
  standalone: true,
  imports: [],
  templateUrl: './black-button-function.component.html',
  styleUrl: './black-button-function.component.css'
})
export class BlackButtonFunctionComponent {
  @Output() buttonFunction = new EventEmitter<void>();
  @Input() value?: string;
  doAction(){
    this.buttonFunction.emit();
  }
}
