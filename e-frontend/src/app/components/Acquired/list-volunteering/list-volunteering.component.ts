import { Component } from '@angular/core';
import { GeneralSService } from '../../../services/general-s.service';
import { LocalstorageService } from '../../../services/localstorage.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-volunteering',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-volunteering.component.html',
  styleUrl: './list-volunteering.component.scss'
})
export class ListVolunteeringComponent {
  listVolunteering: any = [];
  user: any = {};

  constructor(
    private _generalSService: GeneralSService,
    private _localStorage: LocalstorageService
  ) { }

  ngOnInit() {
    this.user = this._localStorage.getUser();
    this.getVolunteering();
  }

  getVolunteering() {
    const data = {
      id: this.user.id
    };
    this._generalSService.getVolunteering(data).subscribe(
      (res: any) => {
        this.listVolunteering = res.volunteering;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  deleteBuy(id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancela la asignación',
      cancelButtonText: 'No, cancela',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          id: id
        };
        this._generalSService.deleteVolunteering(data).subscribe(
          (res: any) => {
            this.getVolunteering();
            Swal.fire('¡Eliminado!', 'Tu voluntariado ha sido cancelada.', 'success');
          },
          (err: any) => {
            Swal.fire('¡Error!', 'Ha ocurrido un error al cancelar la inscripción.', 'error');
          }
        );
      }
    });

  }
}
