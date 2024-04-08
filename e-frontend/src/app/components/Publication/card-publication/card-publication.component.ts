import { Component, Input } from '@angular/core';
import { LocalstorageService } from '../../../services/localstorage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-publication',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-publication.component.html',
  styleUrl: './card-publication.component.scss'
})
export class CardPublicationComponent {
  @Input() publication: any | null = null;
  path: string = "/login";

  constructor(private _localStorage: LocalstorageService) { }

  ngOnInit() {
    const user = this._localStorage.getUser();
    if (!user?._id) {
      this.path = `/home`;
    } else {
      this.path = "/market/view-publication/" + this.publication?._id;
    }
  }
}
