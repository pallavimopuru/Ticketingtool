import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LANDING_PAGE } from '../configs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor( private http:HttpClient) { }


  addloginAPI(data: any) {
    var url = LANDING_PAGE.ticket_roles;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('UserEmail',data);
    return this.http.get(url, {params:queryParams});
  }
}
