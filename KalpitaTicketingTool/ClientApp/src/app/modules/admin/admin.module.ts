import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminSideNavComponent } from './components/admin-side-nav/admin-side-nav.component';
import { AdminTopNavComponent } from './components/admin-top-nav/admin-top-nav.component';
import { AdminTicketHistoryComponent } from './components/admin-ticket-history/admin-ticket-history.component';
import { AdminAssignTicketComponent } from './components/admin-assign-ticket/admin-assign-ticket.component';
import { AdminViewTicketComponent } from './components/admin-view-ticket/admin-view-ticket.component';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';

import { FilterticketsPipe } from './components/pipe/filtertickets.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminOperationsComponent } from './components/admin-operations/admin-operations.component';
import { OperationsDepartmentComponent } from './components/admin-operations/operations-department/operations-department.component';
import { OperationsPriorityComponent } from './components/admin-operations/operations-priority/operations-priority.component';
import { OperationsTicketstatusComponent } from './components/admin-operations/operations-ticketstatus/operations-ticketstatus.component';
import { OperationsTickettypeComponent } from './components/admin-operations/operations-tickettype/operations-tickettype.component';
import { OperationsCategoryComponent } from './components/admin-operations/operations-category/operations-category.component';
import { OperationsApprolesComponent } from './components/admin-operations/operations-approles/operations-approles.component';
import { OperationsAppusersComponent } from './components/admin-operations/operations-appusers/operations-appusers.component';
import { OperationsAppuserrolesComponent } from './components/admin-operations/operations-appuserroles/operations-appuserroles.component';
import { CalendarModule } from 'primeng/calendar';
import {PaginatorModule} from 'primeng/paginator';
import { OperationsDistributionComponent } from './components/admin-operations/operations-distribution/operations-distribution.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {ChartModule} from 'primeng/chart';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminTicketFilterComponent } from './components/admin-ticket-filter/admin-ticket-filter.component';
import { SpinnerComponentComponent } from './components/spinner-component/spinner-component.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [
    AdminTopNavComponent,
    AdminSideNavComponent,
    AdminTicketHistoryComponent,
    AdminAssignTicketComponent,
    AdminViewTicketComponent,
    AdminContainerComponent,
    AdminOperationsComponent,
    OperationsDepartmentComponent,
    OperationsPriorityComponent,
    OperationsTicketstatusComponent,
    OperationsTickettypeComponent,
    OperationsCategoryComponent,
    OperationsApprolesComponent,
    OperationsAppusersComponent,
    OperationsAppuserrolesComponent,
    FilterticketsPipe,
    OperationsDistributionComponent,
    AdminFooterComponent,
    AdminDashboardComponent,
    AdminTicketFilterComponent,
    SpinnerComponentComponent,
    
    
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    NgxPaginationModule,
    CalendarModule,
    PaginatorModule,
    ChartModule,
    NgbModule,
    MatProgressSpinnerModule,
    ProgressSpinnerModule,
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AdminModule { }
