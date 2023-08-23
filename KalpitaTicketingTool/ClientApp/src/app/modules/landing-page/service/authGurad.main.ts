import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthMainGuard implements CanActivate {
    url: any;

    constructor(private router: Router) { }

    canActivate() {
        this.url = sessionStorage.getItem('getURL');
        if (this.url) {
            this.router.navigateByUrl(this.url);
            return true;
        }
        return true;
    }



}