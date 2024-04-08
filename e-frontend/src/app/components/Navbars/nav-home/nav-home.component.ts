import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginSignupComponent } from '../../Common/login-signup/login-signup.component';
import { LocalstorageService } from '../../../services/localstorage.service';
import { CarouselPublicationComponent } from '../../Publication/carousel-publication/carousel-publication.component';
import { CarouselImagesComponent } from '../../Publication/carousel-images/carousel-images.component';

@Component({
  selector: 'app-nav-home',
  standalone: true,
  imports: [RouterOutlet, LoginSignupComponent, CarouselPublicationComponent, CarouselImagesComponent],
  templateUrl: './nav-home.component.html',
  styleUrl: './nav-home.component.scss'
})
export class NavHomeComponent {
  constructor(
    private _localStorageService: LocalstorageService,
    private _router: Router
  ) {
    const user = this._localStorageService.getUser();
    if (user.username) {
      this._router.navigate(['/market']);
    }
  }
}
