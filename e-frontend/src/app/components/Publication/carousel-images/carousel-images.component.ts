import { Component } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-carousel-images',
  standalone: true,
  imports: [],
  templateUrl: './carousel-images.component.html',
  styleUrl: './carousel-images.component.scss'
})
export class CarouselImagesComponent {
  ngAfterViewInit() {
    var splide = new Splide("#image-carousel", {
      type: "loop",
      autoplay: true,
      pauseOnHover: false,
      resetProgress: false,
      progress: true,
      pagination: false,
    });
    splide.mount();
  }
}
