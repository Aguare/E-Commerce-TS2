import { Component } from '@angular/core';
import { CarouselPublicationComponent } from '../../Publication/carousel-publication/carousel-publication.component';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CarouselPublicationComponent],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss'
})
export class MarketComponent {

}
