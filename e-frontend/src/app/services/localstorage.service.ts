import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(
  ) { }

  public saveUser(data: any): void {
    localStorage.setItem('user', JSON.stringify(data));
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  public removeUser(): void {
    localStorage.removeItem('user');
  }
}
