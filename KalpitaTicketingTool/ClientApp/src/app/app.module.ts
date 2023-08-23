import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import {
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './modules/landing-page/sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { ChartModule } from 'primeng/chart';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import {SpinnerComponentComponent} from '../app/modules/admin/components/spinner-component/spinner-component.component'

import { InterceptorService } from './modules/admin/loader/interceptor.service';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'c9777451-f652-45d4-9d34-e4fb052f699b',

       //redirectUri: 'http://localhost:4200/'
      redirectUri: 'https://kalpitaticketingtoolstage.azurewebsites.net/',
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<any, Array<any>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0', [
    'user.read',
    'mail.read',
  ]);
  //protectedResourceMap.set('http://localhost:8080/hello', ['api://d16e1a06-3be2-4ae1-8bd4-718c19cecac3/hello']);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap,
  };
}
@NgModule({
  declarations: [AppComponent, SignInComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
   
    MatProgressSpinnerModule,
    ChartModule,
    OverlayModule,
    MatButtonModule,
    NgxSpinnerModule,
   
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    MsalService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
