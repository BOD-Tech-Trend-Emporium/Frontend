import { Component, Input } from '@angular/core';
import { RoundButtonComponent } from '@components/round-button/round-button.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RoundButtonComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Input() slides: string [] = [];
  currentSlide: number =0;
  getBefore(){
    this.currentSlide = this.currentSlide === 0 ? this.slides.length-1: this.currentSlide -1;
  }
  getNext(){
    this.currentSlide = this.currentSlide === this.slides.length-1 ? 0 : this.currentSlide +1;
  }

  getCurrent(){
    return this.slides[this.currentSlide];
  }
}
