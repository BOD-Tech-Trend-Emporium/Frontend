import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-white-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './white-button.component.html',
  styleUrl: './white-button.component.css'
})
export class WhiteButtonComponent {
  @Input() value:string='';
  @Input() componentUrl:string='';

}
