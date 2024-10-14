import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-imagen',
  standalone: true,
  imports: [],
  templateUrl: './carousel-imagen.component.html',
  styleUrl: './carousel-imagen.component.css'
})
export class CarouselImagenComponent {
  @Input() src?:string;
  @Input() alt?:string;
  @Input() figcaption?: string;
}
