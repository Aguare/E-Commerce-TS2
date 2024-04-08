import { Component } from '@angular/core';
import Splide from '@splidejs/splide';
import { GeneralSService } from '../../../services/general-s.service';
import { CardPublicationComponent } from '../card-publication/card-publication.component';

@Component({
  selector: 'app-carousel-publication',
  standalone: true,
  imports: [CardPublicationComponent],
  templateUrl: './carousel-publication.component.html',
  styleUrl: './carousel-publication.component.scss'
})
export class CarouselPublicationComponent {

  publications: any[] = [];

  constructor(private _generalService: GeneralSService) {
    this._generalService.getCarouselPublication().subscribe(
      (next: any) => {
        this.publications = next.publications;
        console.log(this.publications);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  ngAfterViewInit() {
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
    });
    splide.mount();
  }

}
