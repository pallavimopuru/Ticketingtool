import { Injectable } from '@angular/core';



@Injectable({

  providedIn: 'root'

})

export class AuthService {

  
  empData: any=[];
  constructor() { }

  IsLoggedIn(){

    this.empData = JSON.parse(sessionStorage.getItem('token')!);
    return this.empData?.userrole == 'user'

  }

}
