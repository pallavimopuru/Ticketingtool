import { environment } from 'src/environments/environment';

export const user_url = {
  get_tickets: `${environment.BackendAPI}Ticket/LatestTickets`,
  get_ticket_type: `${environment.BackendAPI}Ticket/TicketTypes`,
  get_departments: `${environment.BackendAPI}Ticket/Departments`,
  get_categories: `${environment.BackendAPI}Ticket/Categories`,
  get_priorities: `${environment.BackendAPI}Ticket/Priorities`,
  get_alltickets: `${environment.BackendAPI}Ticket/AllTickets`,
  get_ticketById: `${environment.BackendAPI}Ticket/TicketById`,
  get_commentById: `${environment.BackendAPI}Ticket/CommentList`,
  post_comment: `${environment.BackendAPI}Ticket/AddComment`,
  get_employeeList: `${environment.BackendAPI}Ticket/EmployeeList`,
  create_ticket: `${environment.BackendAPI}Ticket/AddTicket`,
  download_excel: `${environment.BackendAPI}Ticket/ExcelExport`,
  reopen_ticket: `${environment.BackendAPI}Ticket/ReopenTicket`,
  download_file: `${environment.BackendAPI}Ticket/DownloadFile`,
  ticket_count: `${environment.BackendAPI}DashBoard/DBAllStatusCount`,
  tickettype_chart:`${environment.BackendAPI}DashBoard/DBBarByTicketType`,
  priority_chart:`${environment.BackendAPI}DashBoard/DBPieByPriority`,
  AddTheme:`${environment.BackendAPI}Ticket/AddTheme`,
  GET_TICKETS_FILTERING_SORTING :`${environment.BackendAPI}Ticket/AllTicketsServerOp`
};
export const graph_url = {
  get_profile: `https://graph.microsoft.com/v1.0/me/photo/$value`,
  get_companyName: `https://graph.microsoft.com/v1.0/organization`,
};
