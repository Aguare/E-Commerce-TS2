import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { GeneralSService } from '../../../services/general-s.service';
import { LocalstorageService } from '../../../services/localstorage.service';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-buys',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-buys.component.html',
  styleUrl: './list-buys.component.scss'
})
export class ListBuysComponent {
  listBuys: any = [];
  user: any = {};

  constructor(
    private _generalSService: GeneralSService,
    private _localStorage: LocalstorageService,
    private _chatService: ChatService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.user = this._localStorage.getUser();
    this.getBuys();
  }

  getBuys() {
    const data = {
      id: this.user.id
    };
    this._generalSService.getBuys(data).subscribe(
      (res: any) => {
        this.listBuys = res.buys;
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
      confirmButtonText: 'Sí, cancela la compra',
      cancelButtonText: 'No, cancela',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          id: id
        };
        this._generalSService.deleteBuy(data).subscribe(
          (res: any) => {
            this.getBuys();
            Swal.fire('¡Eliminado!', 'Tu compra ha sido cancelada.', 'success');
          },
          (err: any) => {
            Swal.fire('¡Error!', 'Ha ocurrido un error al cancelar la publicación.', 'error');
          }
        );
      }
    });
  }

  createChat(user: any) {
    const data = {
      idUser1: this.user.id,
      idUser2: user
    };
    this._chatService.createConversation(data).subscribe((res: any) => {
      this._router.navigate(['/market/chat']);
    });
  }
}
