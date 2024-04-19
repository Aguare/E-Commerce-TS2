import { Component } from '@angular/core';
import { LocalstorageService } from '../../../services/localstorage.service';
import { Router, RouterOutlet } from '@angular/router';
import { GeneralSService } from '../../../services/general-s.service';

@Component({
  selector: 'app-nav-common',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './nav-common.component.html',
  styleUrl: './nav-common.component.scss'
})
export class NavCommonComponent {
  user: any = {};
  username: string = '';
  profile: string = '';

  constructor(
    private _localStorageService: LocalstorageService,
    private _router: Router,
    private _generalService: GeneralSService
  ) {
    this.user = this._localStorageService.getUser();
    if (!this.user.username) {
      this._router.navigate(['/home']);
    } else {
      this.username = this.user.username;
      this._generalService.getUser({ id: this.user.id }).subscribe((res: any) => {
        this._localStorageService.removeUser();
        this._localStorageService.saveUser(res.user);
        this.user = res.user;
        this.profile = this.user.profile;
        if (this.user.profile === 'ADMIN') {
          this._router.navigate(['/admin']);
        }
      });
    }
  }

  logout() {
    this._localStorageService.removeUser();
    this._router.navigate(['/home']);
  }

  formatNumber(value: number): string {
    if ((value / 1000000000000) >= 1) {
      return this.cvTD(value / 1000000000000) + 'T';
    } else if ((value / 1000000000) >= 1) {
      return this.cvTD(value / 1000000000) + 'B';
    } else if ((value / 1000000) >= 1) {
      return this.cvTD(value / 1000000) + 'M';
    } else if ((value / 1000) >= 1) {
      return this.cvTD(value / 1000) + 'K';
    } else {
      return value.toString();
    }
  }

  cvTD(value: number): string {
    let val = value.toString();
    if (val.includes('.')) {
      let decimal = val.split('.')[1];
      val = val.split('.')[0] + '.' + decimal.substring(0, 2);
    }
    return val;
  }

}
