import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { GeneralSService } from '../../../services/general-s.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../services/localstorage.service';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent {

  isLoginMode: boolean = true;
  signupForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private _generalService: GeneralSService,
    private _router: Router,
    private _localStorageService: LocalstorageService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      dpi: ['', Validators.required],
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      user: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5),]]
    });
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  onSignup() {
    if (this.signupForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, verifica los campos ',
      });
      return;
    } else if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden'
      });
      return;
    } else {
      this._generalService.registerUser(this.signupForm.value).subscribe(
        {
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Registro exitoso',
              text: 'Usuario registrado correctamente, inicia sesión para continuar'
            });
            this.signupForm.reset();
            this.isLoginMode = true;
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al registrar usuario'
            });
          }
        }
      );
    }
  }

  onLogin() {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, verifica los campos ',
      });
      return;
    } else {
      this._generalService.loginUser(this.loginForm.value).subscribe(
        {
          next: (res: any) => {
            this._localStorageService.saveUser(res.user);
            window.location.reload();
            this._router.navigate(['/market']);
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario o contraseña incorrectos'
            });
          }
        }
      );
    }
  }

}
