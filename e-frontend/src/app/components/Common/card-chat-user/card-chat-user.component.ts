import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import Emitter from 'quill/core/emitter';

@Component({
  selector: 'app-card-chat-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-chat-user.component.html',
  styleUrl: './card-chat-user.component.scss'
})
export class CardChatUserComponent {

  @Input() chatUser: any;
  @Input() idUser: any;
  @Input() idSelected: any;
  isSelected: boolean = false;
  userName: string = '';
  lastMessage: string = '';
  count = 1;
  lastDate: string = '';
  @Output() selectedChat = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.userName = this.chatUser.FK_User1 === this.idUser ? this.chatUser.user2 : this.chatUser.user1;
    this.lastMessage = this.chatUser.last_message || '';    
    this.lastMessage = this.lastMessage.replace(/<[^>]*>?/gm, '');
    this.lastMessage = this.lastMessage.length > 20 ? this.lastMessage.substring(0, 20) + '...' : this.lastMessage;
    this.count = this.chatUser.count;
    const date = new Date(this.chatUser.last_date);

    this.lastDate = this.chatUser.last_date ? this.calculateLastTime(date) : '';
  }

  selectChat() {
    this.selectedChat.emit(this.chatUser);
  }

  calculateLastTime(date: Date) {
    const dateNow = new Date();
    const diff = dateNow.getTime() - date.getTime();
    const diffSeconds = Math.floor(diff / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
      return 'Hace unos segundos';
    } else if (diffMinutes < 60) {
      let text = diffMinutes === 1 ? 'minuto' : 'minutos';
      return `Hace ${diffMinutes} ${text}`;
    } else if (diffHours < 24) {
      let text = diffHours === 1 ? 'hora' : 'horas';
      return `Hace ${diffHours} ${text}`;
    } else {
      return `Hace ${diffDays} días`;
    }
  }

}
