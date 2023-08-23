import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminNotSuperGuard implements CanActivate {
  url: any;

  constructor( private router: Router) { }

  canActivate() {

    var token = sessionStorage.getItem('adminDetails');
    if (token) {
      return true;
    }

    this.url = sessionStorage.getItem('getURL');
    this.router.navigateByUrl(this.url );
    return false;
  }



}