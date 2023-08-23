import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserContainerComponent } from './components/user-container/user-container.component';
import { UserCreateTicketComponent } from './components/user-create-ticket/user-create-ticket.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserTicketHistoryComponent } from './components/user-ticket-history/user-ticket-history.component';
import { UserViewTicketComponent } from './components/user-view-ticket/user-view-ticket.component';
import { UserGuard } from './services/user.guard';

const routes: Routes = [
  {
    path:"",component:UserContainerComponent ,canActivate:[UserGuard],
    children:[
      {path:"",component:UserDashboardComponent},
      {path:"dashboard",component:UserDashboardComponent},
      {path:"create-ticket",component:UserCreateTicketComponent},
      {path:"ticket-history",component:UserTicketHistoryComponent},
      {path:"ticket-history/:ticketId",component:UserViewTicketComponent},
    ]
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: 'full',
    canActivate:[UserGuard]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
