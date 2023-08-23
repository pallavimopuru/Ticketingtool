import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { admin_operation_url } from '../configs/admin-url-configs';

@Injectable({
  providedIn: 'root',
})
export class AdminOperationApiService {

  constructor(private http: HttpClient) { }

  getOperations(method:string) {
    let url = admin_operation_url.GET_OPERATION;
    return this.http.get(url + method);
  }

  updateOperations(payload: any , method:string) {
    let url = admin_operation_url.UPDATE_OPERATION;
    return this.http.patch(url + method , payload);
  }

  addOperations(payload: any , method:string) {
    let url = admin_operation_url.ADD_OPERATION;
    return this.http.post(url + method , payload);
  }
}