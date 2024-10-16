import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionButtonComponent } from '@components/buttons/action-button/action-button.component';
import { ModalComponent } from '@components/modal/modal.component';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [ActionButtonComponent, ModalComponent],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css',
})
export class CustomTableComponent {
  @Input() items: any = [];
  @Input() rows: string[] = [];
  @Input() delete: boolean = false;
  @Input() edit: boolean = false;
  @Output() optionClicked = new EventEmitter<{ value: string; type: string }>();

  getColumnsValues(object: any) {
    return Object.values(object);
  }

  handleOptionClick(value: string, type: string) {
    this.optionClicked.emit({ value, type });
  }
}
