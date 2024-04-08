import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONST } from '../models/constants';

@Injectable({
  providedIn: 'root',
})
export class GeneralSService {

  constructor(private http: HttpClient) { }

  public registerUser(data: any): Observable<any> {
    return this.http.post(`${CONST.GENERAL}/register`, data);
  }

  public loginUser(data: any): Observable<any> {
    return this.http.post(`${CONST.GENERAL}/login`, data);
  }

  public getUser(data: any): Observable<any> {
    return this.http.post(`${CONST.GENERAL}/getUser`, data);
  }

  public getCarouselPublication(): Observable<any> {
    return this.http.get(`${CONST.GENERAL}/getCarouselPublication`);
  }

  public createPublication(data: any): Observable<any> {
    return this.http.post(`${CONST.GENERAL}/createPublication`, data);
  }
}
