import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/landing-page/sign-in/sign-in.component';
import { AuthMainGuard } from './modules/landing-page/service/authGurad.main';

const routes: Routes = [
  { path: "", component: SignInComponent , canActivate:[AuthMainGuard]},
  { path: "sign-in", component: SignInComponent , canActivate:[AuthMainGuard]},
  { path: "superadmin", loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule) },
  { path: "admin", loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule) },
  { path: "user", loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule) },
  {
    path: "**",
    redirectTo: "",
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
