import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeneralSService } from '../../../services/general-s.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../services/localstorage.service';
import { TagInputModule } from 'ngx-chips';
import { EditorModule } from '../editor/editor.module';
import { NgxEditorModule, Editor } from 'ngx-editor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-publication',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TagInputModule, EditorModule, NgxEditorModule],
  templateUrl: './create-publication.component.html',
  styleUrl: './create-publication.component.scss'
})
export class CreatePublicationComponent {
  editor: Editor;
  productDescription: string = '';
  form: FormGroup = new FormGroup({});
  tags: any[] = [];
  type: number = 1;
  imagesPreviewUrls: string[] = [];
  imagesFiles: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _generalService: GeneralSService,
    private _router: Router,
    private _localStorageService: LocalstorageService
  ) {
    this.editor = new Editor();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      price: ['', [Validators.required, Validators.min(0.1), Validators.max(99999999), this.decimalValidator()]],
      images: ['', [Validators.min(1), Validators.max(15), Validators.required]],
      type: ['1'],
      stock: [1, [Validators.required, Validators.min(1), Validators.max(99999999)]]
    });
  }

  decimalValidator() {
    return (control: FormControl) => {
      const value = control.value;
      const isValid = /^\d+(\.\d{1,2})?$/.test(value);
      return isValid ? null : { invalidDecimal: true };
    };
  }

  createPublication() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, rellene todos los campos correctamente',
      });
      return;
    }

    if (this.tags.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, añada al menos una etiqueta',
      });
      return;
    }

    if (this.imagesFiles.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, añada al menos una imagen',
      });
      return;
    }

    if (this.productDescription.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, añada una descripción',
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', this.form.value.title);
    formData.append('description', this.productDescription);
    formData.append('price', this.form.value.price);
    formData.append('stock', this.form.value.stock);
    formData.append('type', this.type.toString());
    let t = "";
    for (let i = 0; i < this.tags.length; i++) {
      t += this.tags[i].value.trim();

      if (i !== this.tags.length - 1) {
        t += ", ";
      }
    }
    formData.append('tags', t);
    formData.append('userId', this._localStorageService.getUser().id);
    formData.append('quantityImages', this.imagesFiles.length.toString());
    for (let i = 0; i < this.imagesFiles.length; i++) {
      formData.append('images', this.imagesFiles[i]);
    }

    Swal.fire({
      title: 'Creando publicación...',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false
    });

    this._generalService.createPublication(formData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Publicación creada con éxito',
          showConfirmButton: false,
          timer: 1500
        });
        this.form.reset();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error al crear la publicación',
        });
      }
    );
  }

  selectType(type: any) {
    this.type = Number(type.target.value);
  }

  onImagesSelect(event: any) {
    const files = event.target.files;
    if (files) {
      this.imagesFiles = Array.from(files);
      this.imagesPreviewUrls = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagesPreviewUrls.push(reader.result as string);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  removeImage(index: number) {
    this.imagesPreviewUrls.splice(index, 1);
    this.imagesFiles.splice(index, 1);
    const input = document.getElementById('images') as HTMLInputElement;
    let newFiles = new DataTransfer();
    for (let i = 0; i < this.imagesFiles.length; i++) {
      newFiles.items.add(this.imagesFiles[i]);
    }
    input.files = newFiles.files;
  }

}
