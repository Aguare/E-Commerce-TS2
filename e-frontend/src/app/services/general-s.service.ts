import {  HttpClient } from '@angular/common/http';
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

  public addFounds(data: any): Observable<any> {
    return this.http.post(`${CONST.GENERAL}/addFounds`, data);
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

  public changeProfileImage(data: any): Observable<any> {
    return this.http.post(`${CONST.GENERAL}/changeProfileImage`, data);
  }

  public getPublications(data: any): Observable<any> {
    return this.http.post(`${CONST.PUBLICATIONS}/getListPublications`, data);
  }

  public getPublicationsAdmin(data: any): Observable<any> {
    return this.http.post(`${CONST.PUBLICATIONS}/getListPublicationsAdmin`, data);
  }

  public updateStatusPublication(data: any): Observable<any> {
    return this.http.post(`${CONST.PUBLICATIONS}/updateStatusPublication`, data);
  }

  public deletePublications(data: any): Observable<any> {
    return this.http.post(`${CONST.PUBLICATIONS}/deletePublication`, data);
  }

  public getPublication(data: any): Observable<any> {
    return this.http.post(`${CONST.PUBLICATIONS}/getPublication`, data);
  }

  public getBuys(data: any): Observable<any> {
    return this.http.post(`${CONST.PUBLICATIONS}/buy_list`, data);
  }

  public deleteBuy(data: any): Observable<any> {
    return this.http.post(`${CONST.PUBLICATIONS}/deleteBuy`, data);
  }

  public getVolunteering(data: any): Observable<any> {
    return this.http.post(`${CONST.PUBLICATIONS}/volunteering_list`, data);
  }

  public deleteVolunteering(data: any): Observable<any> {
    return this.http.post(`${CONST.PUBLICATIONS}/deleteVolunteering`, data);
  }

  public getSpaceAvailable(data: any): Observable<any> {
    return this.http.post(`${CONST.PUBLICATIONS}/verifyAvailableVolunteering`, data);
  }

  public registerBuy(data: any): Observable<any> {
    return this.http.post(`${CONST.PUBLICATIONS}/register_buy`, data);
  }

  public registerVolunteering(data: any): Observable<any> {
    return this.http.post(`${CONST.PUBLICATIONS}/register_volunteering`, data);
  }
}
