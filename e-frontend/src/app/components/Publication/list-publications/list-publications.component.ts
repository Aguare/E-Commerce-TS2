import { Component } from '@angular/core';
import { GeneralSService } from '../../../services/general-s.service';
import { LocalstorageService } from '../../../services/localstorage.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-publications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-publications.component.html',
  styleUrl: './list-publications.component.scss'
})
export class ListPublicationsComponent {

  listPublications: any = [];
  user: any = {};

  constructor(
    private _generalSService: GeneralSService,
    private _localStorage: LocalstorageService
  ) { }

  ngOnInit() {
    this.user = this._localStorage.getUser();
    this.getPublications();
  }

  getPublications() {
    const data = {
      id: this.user.id
    };
    this._generalSService.getPublications(data).subscribe(
      (res: any) => {
        this.listPublications = res.publications;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  deletePublication(id: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'No, cancela',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          id: id
        };
        this._generalSService.deletePublications(data).subscribe(
          (res: any) => {
            this.getPublications();
            Swal.fire('¡Eliminado!', 'Tu publicación ha sido eliminada.', 'success');
          },
          (err: any) => {
            Swal.fire('¡Error!', 'Ha ocurrido un error al eliminar la publicación.', 'error');
          }
        );
      }
    });

  }
}
