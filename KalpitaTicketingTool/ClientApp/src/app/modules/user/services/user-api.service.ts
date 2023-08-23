import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { graph_url, user_url } from '../configs/user-url-config';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  downloadFile() {
    return user_url.download_file;
  }

  getUserTicket(data: any) {
    let url = user_url.get_tickets;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('UserEmail', data);
    return this.http.get(url, { params: queryParams });
  }

  getUserTicketTypes() {
    let url = user_url.get_ticket_type;

    return this.http.get(url);
  }

  getUserDepartments() {
    let url = user_url.get_departments;

    return this.http.get(url);
  }

  getUserCategories(tickettypeid: any, departmentid: any) {
    let url = user_url.get_categories;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('TicketTypeID', tickettypeid);
    queryParams = queryParams.append('DepartmentID', departmentid);
    return this.http.get(url, { params: queryParams });
  }

  getUserTicketPriority() {
    let url = user_url.get_priorities;

    return this.http.get(url);
  }

  getAllTicket(data: any) {
    let url = user_url.get_alltickets;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('UserEmail', data);
    return this.http.get(url, { params: queryParams });
  }

  getTicketById(id: any) {
    let url = user_url.get_ticketById;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', id);
    return this.http.get(url, { params: queryParams });
  }
  getCommentById(id: any) {
    let url = user_url.get_commentById;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', id);
    return this.http.get(url, { params: queryParams });
  }

  getEmployeeList() {
    let url = user_url.get_employeeList;
    return this.http.get(url);
  }

  createTicket(data: any) {
    let url = user_url.create_ticket;
    return this.http.post(url, data);
  }
  postComent(data: any) {
    let url = user_url.post_comment;
    return this.http.post(url, data);
  }

  download_excel(userEmail: any, startDate: any, enddate: any) {
    let url = user_url.download_excel;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('UserEmail', userEmail);
    queryParams = queryParams.append('StartDate', startDate);
    queryParams = queryParams.append('EndDate', enddate);
    return this.http.get(url, { params: queryParams });
  }
  reopenTicket(data: any) {
    let url = user_url.reopen_ticket;
    return this.http.patch(url, data);
  }

  getpicture(): Observable<SafeUrl> {
    let apiLink = graph_url.get_profile;
    return this.http.get(apiLink, { responseType: 'blob' }).pipe(
      map((res) => {
        let url = window.URL;
        // console.log(url);
        // console.log(res);

        return this.sanitizer.bypassSecurityTrustUrl(url.createObjectURL(res));
      })
    );
  }

  getcompanyName() {
    let apiLink = graph_url.get_companyName;
    return this.http.get(apiLink);
  }
  getticketcount(departmentID: any, departmentName: any) {
    let url = user_url.ticket_count;
    let queryParams = new HttpParams();
    let value = JSON.parse(sessionStorage.getItem('userDetails')!);
    queryParams = queryParams.append('UserName', value?.userName);
    queryParams = queryParams.append('UserEmail', value?.userEmail);
    queryParams = queryParams.append('DepartmentID', departmentID);
    queryParams = queryParams.append('DepartmentName', departmentName);
    return this.http.get(url, { params: queryParams });
  }
  get_StatusData(departmentID: any, departmentName: any) {
    let url = user_url.tickettype_chart;
    let queryParams = new HttpParams();
    let value = JSON.parse(sessionStorage.getItem('userDetails')!);
    queryParams = queryParams.append('UserName', value?.userName);
    queryParams = queryParams.append('UserEmail', value?.userEmail);
    queryParams = queryParams.append('DepartmentID', departmentID);
    queryParams = queryParams.append('DepartmentName', departmentName);
    return this.http.get(url, { params: queryParams });
  }
  get_PriorityData(departmentID: any, departmentName: any) {
    let url = user_url.priority_chart;
    let queryParams = new HttpParams();
    let value = JSON.parse(sessionStorage.getItem('userDetails')!);
    queryParams = queryParams.append('UserName', value?.userName);
    queryParams = queryParams.append('UserEmail', value?.userEmail);
    queryParams = queryParams.append('DepartmentID', departmentID);
    queryParams = queryParams.append('DepartmentName', departmentName);
    return this.http.get(url, { params: queryParams });
  }
  userAddTheme(obj:any){
    let url =user_url.AddTheme;
    return this.http.post(url,obj)
  }

  public getTicketsAndPostFilteringSortingParams(filterObject: any) {
    let url = user_url.GET_TICKETS_FILTERING_SORTING;
    return this.http.post(url, filterObject);
  }
}
