import { Component, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardChatUserComponent } from '../card-chat-user/card-chat-user.component';
import { CardMessageComponent } from '../card-message/card-message.component';
import { ScrollToBottomDirectiveDirective } from '../scroll-to-bottom-directive.directive';
import { ChatService } from '../../../services/chat.service';
import { LocalstorageService } from '../../../services/localstorage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { EditorModule } from '../../Publication/editor/editor.module';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, CardChatUserComponent, CardMessageComponent, ScrollToBottomDirectiveDirective, FormsModule, EditorModule, NgxEditorModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  editor: Editor = new Editor();
  user: any = this._localStorage.getUser();
  idSelected: any = 0;
  listChats: any = [];
  listMessages: any = [];
  newMessage: string = '';

  constructor(
    private _chatService: ChatService,
    private _localStorage: LocalstorageService
  ) {

  }

  ngOnInit() {
    this.getConversations();
  }

  selectChat(chat: any) {
    this.idSelected = chat.id;
    console.log(chat);
    this.getMessages();
  }

  getConversations() {
    const data = {
      idUser: this.user.id
    };

    this._chatService.getConversations(data).subscribe((res: any) => {
      this.listChats = res.conversations;
    });
  }

  getMessages() {
    const data = {
      idConversation: this.idSelected
    };

    this._chatService.getMessages(data).subscribe((res: any) => {
      this.listMessages = res.messages;
    });
  }

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }
    const data = {
      idConversation: this.idSelected,
      idUser: this.user.id,
      message: this.newMessage.trim()
    };

    this._chatService.sendMessage(data).subscribe((res: any) => {
      this.newMessage = '';
      this.getMessages();
      this.getConversations();
    });
  }
}
