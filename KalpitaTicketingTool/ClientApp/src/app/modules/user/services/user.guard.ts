import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.guard';



@Injectable({

  providedIn: 'root'

})

export class UserGuard implements CanActivate {
  url: any ;

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    var token = sessionStorage.getItem('userDetails');
    if (token) {
     
      return true;
    }
    this.url = sessionStorage.getItem('getURL');
    this.router.navigateByUrl(this.url );
    return false;
  }



}