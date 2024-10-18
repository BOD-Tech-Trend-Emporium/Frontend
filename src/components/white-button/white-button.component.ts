import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-white-button',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './white-button.component.html',
  styleUrl: './white-button.component.css'
})
export class WhiteButtonComponent {
  @Input() value:string='';
  @Input() componentUrl:string='';
  @Input() disable: boolean = false;

}
