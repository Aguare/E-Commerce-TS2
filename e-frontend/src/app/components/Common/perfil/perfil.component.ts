import { Component } from '@angular/core';
import { LocalstorageService } from '../../../services/localstorage.service';
import { GeneralSService } from '../../../services/general-s.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

  user: any = this._localStorage.getUser();
  newProfileImage: File | null = null;

  constructor(
    private _localStorage: LocalstorageService,
    private _generalSService: GeneralSService
  ) { }

  ngOnInit() {
  }

  onImagesSelect(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.newProfileImage = files[0];
    }
  }

  changeImage() {
    if (this.newProfileImage) {
      const formData = new FormData();
      formData.append('images', this.newProfileImage);
      formData.append('isProfileImg', '1');
      formData.append('userId', this._localStorage.getUser().id);
      this._generalSService.changeProfileImage(formData).subscribe(
        (res: any) => {
          this.user.profileImage = res.profileImage;
          Swal.fire({
            icon: 'success',
            title: 'Imagen cambiada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al cambiar la imagen',
          });
        }
      );
    }
  }
}
