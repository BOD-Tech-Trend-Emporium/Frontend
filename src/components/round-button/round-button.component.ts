import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-round-button',
  standalone: true,
  imports: [],
  templateUrl: './round-button.component.html',
  styleUrl: './round-button.component.css'
})
export class RoundButtonComponent {
  @Output() buttonFunction = new EventEmitter<void>();
  @Input() value?: string;
  doAction(){
    this.buttonFunction.emit();
  }
}
