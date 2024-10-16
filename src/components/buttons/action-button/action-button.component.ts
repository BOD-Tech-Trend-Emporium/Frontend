import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export enum ButtonTypes {
  default = 'default',
  delete = 'delete',
  edit = 'edit',
}

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css',
})
export class ActionButtonComponent {
  @Input() type: string = ButtonTypes.default;
  @Input() value: string = '';
  @Input() data: string = '';
  @Output() clicked = new EventEmitter<string>();

  handleClick() {
    this.clicked.emit(this.data);
  }

  getButtonColors() {
    switch (this.type) {
      case 'default':
        return 'w-full text-white py-1 px-3 rounded-lg bg-gray-900 hover:bg-gray-950';
      case 'delete':
        return 'w-full text-white py-1 px-3 rounded-lg bg-red-500 hover:bg-red-600';
      case 'edit':
        return 'w-full text-white py-1 px-3 rounded-lg bg-blue-900 hover:bg-blue-950';
      default:
        return 'w-full text-white py-1 px-3 rounded-lg bg-gray-900 hover:bg-gray-950';
    }
  }
}
