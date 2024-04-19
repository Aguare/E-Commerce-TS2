import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeneralSService } from '../../../services/general-s.service';
import { LocalstorageService } from '../../../services/localstorage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-founds',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-founds.component.html',
  styleUrl: './add-founds.component.scss'
})
export class AddFoundsComponent {

  registerForm: any = FormGroup;
  user: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private _generalServices: GeneralSService,
    private _localStorage: LocalstorageService
  ) {
    this.user = this._localStorage.getUser();
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      card: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      dateY: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      dateM: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });
  }

  addFounds() {
    if (this.registerForm.get('amount').value === '') {
      Swal.fire('Error', 'El campo monto es obligatorio', 'error');
      return;
    }

    if (!this.registerForm.valid) {
      Swal.fire('Error', 'Por favor, complete todos los campos', 'error');
      return;
    }

    const data = {
      id: this.user.id,
      money: this.registerForm.get('amount').value,
    };

    this._generalServices.addFounds(data).subscribe((response: any) => {
      if (response.status !== 200) {
        Swal.fire({
          title: 'Éxito',
          text: 'Fondos agregados correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        Swal.fire('Error', 'Ha ocurrido un error al agregar fondos', 'error');
      }
    });
  }
}
