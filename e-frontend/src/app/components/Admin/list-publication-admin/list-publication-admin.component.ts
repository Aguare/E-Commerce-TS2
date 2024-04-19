import { Component } from '@angular/core';
import { GeneralSService } from '../../../services/general-s.service';
import { LocalstorageService } from '../../../services/localstorage.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-publication-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-publication-admin.component.html',
  styleUrl: './list-publication-admin.component.scss'
})
export class ListPublicationAdminComponent {

  listPublications: any = [];
  user: any = {};
  onlyPending: boolean = false;

  constructor(
    private _generalSService: GeneralSService,
    private _localStorage: LocalstorageService
  ) { }

  ngOnInit() {
    this.user = this._localStorage.getUser();
    this.getPublications();
  }

  changeOnlyPending() {
    this.onlyPending = !this.onlyPending;
    this.getPublications();
  }

  getPublications() {
    const data = {
      onlyPending: this.onlyPending
    };
    this._generalSService.getPublicationsAdmin(data).subscribe(
      (res: any) => {
        this.listPublications = res.publications;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  updateStatus(id: number, status = 'approved') {
    const data = {
      id: id,
      status: status
    };
    this._generalSService.updateStatusPublication(data).subscribe(
      (res: any) => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'La publicación ha sido actualizada correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.getPublications();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
