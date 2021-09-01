import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FrontEndDeveloperModel} from '../models/front-end-developers';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  sendFrontEndData(frontEndDeveloperData: FrontEndDeveloperModel): void/*: Observable<FrontEndDeveloperModel>*/ {
    console.log(frontEndDeveloperData);
    /*return this.http.post<FrontEndDeveloperModel>(`${environment.apiUrl}`, frontEndDeveloperData);*/
  }
}
