import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { admin_url, graph_url } from '../configs/admin-url-configs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getAdminTicketTypes() {
    let url = admin_url.get_tickettypes;
    return this.http.get(url);
  }

  getAdminDepartments() {
    let url = admin_url.get_department;
    return this.http.get(url);
  }

  getAdminEmployee() {
    let url = admin_url.get_employee;
    return this.http.get(url);
  }

  getadminCategories(tickettypeid: any, departmentid: any) {
    let url = admin_url.get_categories;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('TicketTypeID', tickettypeid);
    queryParams = queryParams.append('DepartmentID', departmentid);
    return this.http.get(url, { params: queryParams });
  }

  getadminPriorites() {
    let url = admin_url.get_priorities;
    return this.http.get(url);
  }

  getAdminRoles() {
    let url = admin_url.get_employee;
    return this.http.get(url);
  }

  getAllTicket(data: any) {
    let url = admin_url.get_alltickets;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('UserEmail', data);
    return this.http.get(url, { params: queryParams });
  }

  getTicketById(data: any) {
    let url = admin_url.get_ticketById;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', data);
    return this.http.get(url, { params: queryParams });
  }
  getassignlist(DepartmentID: any) {
    let url = admin_url.get_assignlist;
    let queryParams = new HttpParams();
    let value = JSON.parse(sessionStorage.getItem('adminDetails')!);
    queryParams = queryParams.append('UserName', value?.userName);
    queryParams = queryParams.append('UserEmail', value?.userEmail);
    queryParams = queryParams.append('DepartmentID', DepartmentID);
    return this.http.get(url, { params: queryParams });
  }
  getRecentTicket(data: any) {
    let url = admin_url.get_recentTickets;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('UserEmail', data);
    return this.http.get(url, { params: queryParams });
  }
  getCommentById(id: any) {
    let url = admin_url.get_commentById;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', id);
    return this.http.get(url, { params: queryParams });
  }
  assignTicket(data: any) {
    let url = admin_url.assign_ticket;
    return this.http.post(url, data);
  }
  getStatus() {
    let url = admin_url.ticket_status;
    return this.http.get(url);
  }
  postComent(data: any) {
    let url = admin_url.post_comment;
    return this.http.post(url, data);
  }
  // getdownloadimage(data:any){
  //   let url=admin_url.get_image
  //   let queryParams=new HttpParams();
  //   queryParams=queryParams.append('fileName',data);
  //   return this.http.get(url,{params: queryParams})
  // }
  updateTicket(data: any) {
    let url = admin_url.update_ticket;
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
  get_DBAllStatusCount(departmentID: any, departmentName: any) {
    let url = admin_url.all_DBStatus;
    let queryParams = new HttpParams();
    let value = JSON.parse(sessionStorage.getItem('adminDetails')!);
    queryParams = queryParams.append('UserName', value?.userName);
    queryParams = queryParams.append('UserEmail', value?.userEmail);
    queryParams = queryParams.append('DepartmentID', departmentID);
    queryParams = queryParams.append('DepartmentName', departmentName);
    return this.http.get(url, { params: queryParams });
  }
  get_PieData(departmentID: any, departmentName: any) {
    let url = admin_url.Pie_Data;
    let queryParams = new HttpParams();
    let value = JSON.parse(sessionStorage.getItem('adminDetails')!);
    queryParams = queryParams.append('UserName', value?.userName);
    queryParams = queryParams.append('UserEmail', value?.userEmail);
    queryParams = queryParams.append('DepartmentID', departmentID);
    queryParams = queryParams.append('DepartmentName', departmentName);
    return this.http.get(url, { params: queryParams });
  }
  getBarByTicketTypeData(departmentID: any, departmentName: any) {
    let url = admin_url.DBBarByTicketType;
    let queryParams = new HttpParams();
    let value = JSON.parse(sessionStorage.getItem('adminDetails')!);
    queryParams = queryParams.append('UserName', value?.userName);
    queryParams = queryParams.append('UserEmail', value?.userEmail);
    queryParams = queryParams.append('DepartmentID', departmentID);
    queryParams = queryParams.append('DepartmentName', departmentName);
    return this.http.get(url, { params: queryParams });
  }
  getColumnByAssignee(departmentID: any, departmentName: any) {
    let url = admin_url.DBColumnByAssignee;
    let queryParams = new HttpParams();
    let value = JSON.parse(sessionStorage.getItem('adminDetails')!);
    queryParams = queryParams.append('UserName', value?.userName);
    queryParams = queryParams.append('UserEmail', value?.userEmail);
    queryParams = queryParams.append('DepartmentID', departmentID);
    queryParams = queryParams.append('DepartmentName', departmentName);
    return this.http.get(url, { params: queryParams });
  }

  getColumnByPriority(
    departmentID: any,
    departmentName: any,
    filterRange: any
  ) {
    let url = admin_url.DBColumnByPriority;
    let queryParams = new HttpParams();
    let value = JSON.parse(sessionStorage.getItem('adminDetails')!);
    queryParams = queryParams.append('UserName', value?.userName);
    queryParams = queryParams.append('UserEmail', value?.userEmail);
    queryParams = queryParams.append('DepartmentID', departmentID);
    queryParams = queryParams.append('DepartmentName', departmentName);
    queryParams = queryParams.append('FilterRange', filterRange);
    return this.http.get(url, { params: queryParams });
  }
  getFilterRange(departmentID: any, departmentName: any, filterRange: any) {
    let url = admin_url.DBFilterRange;
    let queryParams = new HttpParams();
    let value = JSON.parse(sessionStorage.getItem('adminDetails')!);
    queryParams = queryParams.append('UserName', value?.userName);
    queryParams = queryParams.append('UserEmail', value?.userEmail);
    queryParams = queryParams.append('DepartmentID', departmentID);
    queryParams = queryParams.append('DepartmentName', departmentName);
    queryParams = queryParams.append('FilterRange', filterRange);
    return this.http.get(url, { params: queryParams });
  }
  adminAddTheme(obj: any) {
    let url = admin_url.AddTheme;
    return this.http.post(url, obj);
  }

  changeTheme(obj: any) {
    let url = admin_url.ticket_roles;
    return this.http.get(url, obj);
  }

  public getTicketsAndPostFilteringSortingParams(filterObject: any) {
    let url = admin_url.GET_TICKETS_FILTERING_SORTING;
    return this.http.post(url, filterObject);
  }
}
