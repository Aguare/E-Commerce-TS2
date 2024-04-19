import { AfterViewInit, Component } from '@angular/core';
import Splide from '@splidejs/splide';
import { GeneralSService } from '../../../services/general-s.service';
import { CardPublicationComponent } from '../card-publication/card-publication.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-publication',
  standalone: true,
  imports: [CardPublicationComponent, CommonModule],
  templateUrl: './carousel-publication.component.html',
  styleUrl: './carousel-publication.component.scss'
})
export class CarouselPublicationComponent implements AfterViewInit {

  publications: any[] = [];

  constructor(private _generalService: GeneralSService) {
    this._generalService.getCarouselPublication().subscribe(
      (next: any) => {
        this.publications = next.publications;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initSplide();
    }, 200);
  }

  initSplide() {
    var splide = new Splide("#publication-carousel", {
      type: "loop",
      perPage: 4,
      perMove: 1,
      gap: "0",
      padding: {
        right: "0px",
        left: "0px",
      },
      pagination: false,
      arrows: true,
      autoplay: true,
      interval: 3000,
      rewind: true,
      resetProgress: true,
    });
    splide.mount();

    var splide2 = new Splide("#volunteering-carousel", {
      type: "loop",
      perPage: 4,
      perMove: 1,
      gap: "0",
      padding: {
        right: "0px",
        left: "0px",
      },
      pagination: false,
      arrows: true,
      autoplay: true,
      interval: 3000,
      rewind: true,
      resetProgress: true,
    });
    splide2.mount();
  }

}
