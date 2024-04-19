import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-message.component.html',
  styleUrl: './card-message.component.scss'
})
export class CardMessageComponent {

  @Input() message: any;
  @Input() idUserSession: any;
  nameUser: string = '';
  lastTime: string = '';
  
  profileImage: string = '';

  constructor() { }

  ngOnInit() {
    this.nameUser = this.message.user;
    const date = new Date(this.message.created_at);
    this.lastTime = this.calculateLastTime(date);
    this.profileImage = this.message.profile;
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
