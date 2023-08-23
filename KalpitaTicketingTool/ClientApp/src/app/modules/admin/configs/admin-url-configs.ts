import { environment } from 'src/environments/environment';

export const admin_url = {
  get_tickettypes: `${environment.BackendAPI}Ticket/TicketTypes`,
  get_department: `${environment.BackendAPI}Ticket/Departments`,
  get_categories: `${environment.BackendAPI}Ticket/Categories`,
  get_priorities: `${environment.BackendAPI}Ticket/Priorities`,
  get_alltickets: `${environment.BackendAPI}Ticket/AllTickets`,
  get_ticketById: `${environment.BackendAPI}Ticket/TicketById`,
  get_recentTickets: `${environment.BackendAPI}Ticket/LatestTickets`,
  get_assignlist: `${environment.BackendAPI}Ticket/AssignList`,
  get_commentById: `${environment.BackendAPI}Ticket/CommentList`,
  assign_ticket: `${environment.BackendAPI}Ticket/AddTicket`,
  ticket_status: `${environment.BackendAPI}Ticket/TicketStatuses`,
  post_comment: `${environment.BackendAPI}Ticket/AddComment`,
  update_ticket: `${environment.BackendAPI}Ticket/UpdateTicket`,
  get_employee: `${environment.BackendAPI}Ticket/EmployeeList`,
  download_file :`${environment.BackendAPI}Ticket/DownloadFile`,
  download_excel: `${environment.BackendAPI}Ticket/ExcelExport`,
  all_DBStatus: `${environment.BackendAPI}DashBoard/DBAllStatusCount`,
 Pie_Data: `${environment.BackendAPI}DashBoard/DBPieByStatus`,
 DBBarByTicketType: `${environment.BackendAPI}DashBoard/DBBarByTicketType`,
 DBColumnByAssignee: `${environment.BackendAPI}DashBoard/DBColumnByAssignee`,
 DBColumnByPriority: `${environment.BackendAPI}DashBoard/DBColumnByPriority`,
 DBFilterRange: `${environment.BackendAPI}DashBoard/DBFilterRange`,
 AddTheme: `${environment.BackendAPI}Ticket/AddTheme`,
 ticket_roles: `${environment.BackendAPI}Ticket/Roles`,

//  DBBarByTicketType: `${environment.BackendAPI}/DashBoard/DBBarByTicketType`,
 GET_TICKETS_FILTERING_SORTING :`${environment.BackendAPI}Ticket/AllTicketsServerOp`
  
};

export const admin_operation_url = {
  GET_OPERATION: `${environment.BackendAPI}Admin/Get`,
  UPDATE_OPERATION: `${environment.BackendAPI}Admin/Update`,
  ADD_OPERATION: `${environment.BackendAPI}Admin/Add`,
};


export const graph_url = {
  get_profile: `https://graph.microsoft.com/v1.0/me/photo/$value`,
  get_companyName: `https://graph.microsoft.com/v1.0/organization`,
};


