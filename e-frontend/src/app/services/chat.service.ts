import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONST } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  public getConversations(data: any): Observable<any>{
    return this.http.post(`${CONST.CHAT}/getConversations`, data);
  }

  public getMessages(data: any): Observable<any>{
    return this.http.post(`${CONST.CHAT}/getMessages`, data);
  }

  public sendMessage(data: any): Observable<any>{
    return this.http.post(`${CONST.CHAT}/sendMessage`, data);
  }

  public createConversation(data: any): Observable<any>{
    return this.http.post(`${CONST.CHAT}/createConversation`, data);
  }
}
