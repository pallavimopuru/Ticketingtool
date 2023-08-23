import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './authService/admin.guard';
import { AdminAssignTicketComponent } from './components/admin-assign-ticket/admin-assign-ticket.component';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminOperationsComponent } from './components/admin-operations/admin-operations.component';
import { AdminTicketHistoryComponent } from './components/admin-ticket-history/admin-ticket-history.component';
import { AdminViewTicketComponent } from './components/admin-view-ticket/admin-view-ticket.component';
import { AdminNotSuperGuard } from './service/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminContainerComponent,
    canActivate: [AdminNotSuperGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'asign-ticket', component: AdminAssignTicketComponent },
      { path: 'ticket-history', component: AdminTicketHistoryComponent },
      { path: 'ticket-history/:ticketId', component: AdminViewTicketComponent },
      { path: 'operations', component: AdminOperationsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
