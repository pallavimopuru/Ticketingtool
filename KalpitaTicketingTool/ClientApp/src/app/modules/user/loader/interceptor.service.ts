import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from './loader.service';
import { Observable, Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public readonly  loaderService:LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const spinnerSubscription: Subscription = this.loaderService.spinner$.subscribe();
    return next.handle(req)
    .pipe(finalize(() => spinnerSubscription.unsubscribe()));
    
  }
}