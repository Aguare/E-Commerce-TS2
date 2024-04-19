import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-carousel-images-publi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-images-publi.component.html',
  styleUrl: './carousel-images-publi.component.scss'
})
export class CarouselImagesPubliComponent implements AfterViewInit {
  @Input() listImages: any[] = [];

  constructor() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCarousel();
    }, 150);
  }

  private initCarousel() {
    const splide = new Splide("#image-carousel", {
      type: "loop",
      autoplay: true,
      pauseOnHover: false,
      resetProgress: true,
      progress: true,
      pagination: false,
    });
    splide.mount();
  }

}
