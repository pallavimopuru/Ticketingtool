import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserTopNavComponent } from './components/user-top-nav/user-top-nav.component';
import { UserSideNavComponent } from './components/user-side-nav/user-side-nav.component';
import { UserCreateTicketComponent } from './components/user-create-ticket/user-create-ticket.component';
import { UserTicketHistoryComponent } from './components/user-ticket-history/user-ticket-history.component';
import { UserContainerComponent } from './components/user-container/user-container.component';
import { UserViewTicketComponent } from './components/user-view-ticket/user-view-ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FilterticketsPipe } from './Pipe/filtertickets.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import {TableModule} from 'primeng/table';
import {PickListModule} from 'primeng/picklist';
import {CalendarModule} from 'primeng/calendar';
import { UserFooterComponent } from './components/user-footer/user-footer.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import {ChartModule} from 'primeng/chart';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserTicketFilterComponent } from './components/user-ticket-filter/user-ticket-filter.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [
    UserTopNavComponent,
    UserSideNavComponent,
    UserCreateTicketComponent,
    UserTicketHistoryComponent,
    UserContainerComponent,
    UserViewTicketComponent,
    FilterticketsPipe,
    UserFooterComponent,
    UserDashboardComponent,
    UserTicketFilterComponent,
    SpinnerComponent,
    


  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PickListModule,
    CalendarModule,
    TableModule,
    ChartModule,
    ProgressSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgbModule
  ]
})
export class UserModule { }
