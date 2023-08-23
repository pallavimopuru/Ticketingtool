import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';



import { AuthService } from './auth.guard';



@Injectable({

  providedIn: 'root'

})

export class AdminGuard implements CanActivate {

  constructor(private auth:AuthService , private router:Router){}

  canActivate(){

   if(this.auth.IsLoggedIn()){

     return true;

   }

   this.router.navigate(['']);

    return false;



  }



}