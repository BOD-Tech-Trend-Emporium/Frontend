import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basic-imagen',
  standalone: true,
  imports: [],
  templateUrl: './basic-imagen.component.html',
  styleUrl: './basic-imagen.component.css'
})
export class BasicImagenComponent {
  @Input() src?:string;
  @Input() alt?:string;
  @Input() figcaption?: string;
}
