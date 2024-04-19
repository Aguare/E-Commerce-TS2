import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralSService } from '../../../services/general-s.service';
import { CarouselImagesPubliComponent } from '../carousel-images-publi/carousel-images-publi.component';
import { LocalstorageService } from '../../../services/localstorage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-publication',
  standalone: true,
  imports: [CommonModule, CarouselImagesPubliComponent],
  templateUrl: './view-publication.component.html',
  styleUrl: './view-publication.component.scss'
})
export class ViewPublicationComponent {

  id: number = 0;
  publication: any = {};
  images: any = [];
  tags: any = [];
  exists: boolean = false;
  user: any = {};
  quantity: number = 0;
  registered: number = 0;
  volunteering: any = [];
  isRegistered: boolean = false;

  constructor(
    private _routes: ActivatedRoute,
    private _generalSService: GeneralSService,
    private _localService: LocalstorageService,
  ) {
    const params = this._routes.snapshot.params;
    if (params['id']) {
      this.id = Number(params['id']);
      this.getPublication();
      this.isRegistered = this.verifyUserVolunteering();
    }
    this.user = this._localService.getUser();
  }

  ngOnInit() {
  }

  getPublication() {
    const data = {
      id: this.id
    };
    this._generalSService.getPublication(data).subscribe(
      (res: any) => {
        if (res.publication) {
          this.publication = res.publication[0];
          this.images = res.images;
          this.tags = res.tags;
          this.volunteering = res.volunteering;
          if (this.publication.id) {
            this.exists = true;
            if (this.publication.isVolunteering) {
              this.getSpaceAvailable();
              this.isRegistered = this.verifyUserVolunteering();
            }
          }
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  getSpaceAvailable() {
    const data = {
      idPublication: this.id
    };
    this._generalSService.getSpaceAvailable(data).subscribe(
      (res: any) => {
        console.log();
        this.quantity = res.coups[0].available;
        this.registered = res.coups[0].registered;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  registerBuy() {
    Swal.fire({
      title: '¿Quieres comprarlo con dinero o fichas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Dinero',
      cancelButtonText: 'Fichas',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.verifyMoney();
      } else if (result.isDismissed) {
        this.verifyCoins();
      } else {
        console.log('Acción cancelada');
      }
    });
  }

  callRegisterBuy(withMoney: boolean = true) {
    const data = {
      idPublication: this.id,
      idUser: this.user.id,
      amount: this.publication.priceM,
      withMoney: withMoney,
      coins: this.user.coins,
      money: this.user.money
    };
    this._generalSService.registerBuy(data).subscribe(
      (res: any) => {
        if (res.message) {
          alert(res.message);
        }
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  verifyMoney() {
    if (this.user.money < this.publication.priceM) {
      Swal.fire('¡Error!', 'No cuentas con el dinero suficiente para realizar la compra', 'error');
    } else {
      this.callRegisterBuy(true);
    }
  }

  verifyCoins() {
    if (this.user.coins < this.publication.priceCP) {
      Swal.fire('¡Error!', 'No cuentas con las fichas suficientes para realizar la compra', 'error');
    } else {
      this.callRegisterBuy(false);
    }
  }

  registerVolunteering() {
    Swal.fire({
      title: '¿Estás seguro que deseas registrarte?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrarse',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isDenied || result.isDismissed) {
        return;
      } else {
        const data = {
          idPublication: this.id,
          idUser: this.user.id,
          amount: this.publication.priceCP,
        };
        this._generalSService.registerVolunteering(data).subscribe(
          (res: any) => {
            if (res.message) {
              Swal.fire('¡Éxito!', res.message, 'success');
            }
          },
          (err: any) => {
            console.log(err);
          }
        )
      }
    }
    );
  }

  verifyVolunteering() {
    if (this.quantity > this.registered) {
      this.registerVolunteering();
    } else {
      Swal.fire('¡Error!', 'No hay espacio disponible para registrarse', 'error');
    }
  }

  verifyUserVolunteering(): boolean {
    for (let dt of this.volunteering) {
      if (dt.user === this.user.id) {
        return true;
      }
    }
    return false;
  }

}
