import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-admin-operations',
  templateUrl: './admin-operations.component.html',
  styleUrls: ['./admin-operations.component.css']
})
export class AdminOperationsComponent implements OnInit {
  operation: any = "TT";

  operationOptions: any[] = [
    { label: 'Ticket Type', value: "TT" },
    { label: 'Priority', value: "PT" },
    { label: 'Ticket Status', value: "TS" },
    { label: 'Department', value: "DM" },
    { label: 'Category', value: "CG" },
    { label: 'App Roles', value: "AR" },
    { label: 'App Users', value: "AU" },
    { label: 'App User Roles', value: "AUR" },
    { label: 'Distribution List', value: "DL" },
  ];

  columnHeader: any[] = [];

  operations: any[] = [];

  pageForm: FormGroup | any;

  DepartmentText: any;

  dropdownValue: any = [
    { label: "value 1" },
    { label: "value 2" },
    { label: "value 3" },
  ]

  get department() {
    return this.pageForm.get('department');
  }

  get Priority(){
    return this.pageForm.get('Priority');
  }



  constructor(private toastr: ToastrService,
    private themeService:ThemeService) { }

  ngOnInit(): void {
         //This piece of code where Theme is being set should be always present in the First Route Component
    // var adminTheme = JSON.parse(sessionStorage.getItem('userTheme')!);
    var theme = JSON.parse(sessionStorage.getItem('displayTheme')!);
    //console.log("displayTheme",theme)
    // var adminTheme = value?.userTheme;
    this.themeService.setTheme(theme);
    //This piece of code where Theme is being set should be always present in the First Route Component

    this.pageForm = new FormGroup({
      department: new FormGroup(
        {
          DepartmentName: new FormControl(''),
          Description: new FormControl(''),
          DefaultUser: new FormControl(''),
        }),
      Priority: new FormGroup(
        {
          PriorityType: new FormControl(''),
          Description: new FormControl(''),
        }),
      TicketStatus: new FormGroup(
        {
          TicketStatusID: new FormControl(''),
          TicketStatus: new FormControl(''),
        }),
      TicketType: new FormGroup(
        {
          TicketTypeID: new FormControl(''),
          TicketType: new FormControl(''),
          Description: new FormControl(''),
        }),
      Category: new FormGroup(
        {
          CategoryID: new FormControl(''),
          CategoryName: new FormControl(''),
          DepartmentID: new FormControl(''),
          DepartmentName: new FormControl(''),
          TicketTypeID: new FormControl(''),
          TicketType: new FormControl(''),
        }),

      AppRoles: new FormGroup(
        {
          RoleName: new FormControl(''),
          RoleLandingPage: new FormControl(''),
        }),
      AppUsers: new FormGroup(
        {
          UserEmail: new FormControl(''),
          Description: new FormControl(''),
          category: new FormControl(''),
          DepartmentName: new FormControl(''),
          quantity: new FormControl(''),
        }),
      AppUserRoles: new FormGroup(
        {
          UserName: new FormControl(''),
          RoleID: new FormControl(''),
          RoleName: new FormControl(''),
          DepartmentID: new FormControl(''),
          DepartmentName: new FormControl(''),
        })

      });
  }



  onChange(event: any) {
    //console.log("operation", this.operation);

    if (this.operation == 'DM') {
      this.departmentDetails();
    } else if (this.operation == 'PT') {
      this.priorityDetails();
    }
    else if (this.operation == 'TS') {
      this.ticketStatusDetails();
    }
    else if (this.operation == 'TT') {
      this.ticketTypeDetails();
    }
    else if (this.operation == 'CG') {
      this.categoryDetails();
    }
    else if (this.operation == 'AR') {
      this.appRolesDetails();
    }
    else if (this.operation == 'AU') {
      this.appUsersDetails();
    }
    else if (this.operation == 'AUR') {
      this.appUserRolesDetails();
    }
    this.operations = [];
  }

  departmentDetails() {

    this.columnHeader = [
      { field: 'DepartmentID', header: 'Department ID' },
      { field: 'DepartmentName', header: 'Department Name' },
      { field: 'Description', header: 'Description' },
      { field: 'DefaultUser', header: 'Default User' }
    ];

  }

  priorityDetails() {
    this.columnHeader = [
      { field: 'PriorityID', header: 'Priority ID' },
      { field: 'PriorityType', header: 'PriorityType' },
      { field: 'Description', header: 'Description' }
    ];
  }

  ticketStatusDetails() {
    this.columnHeader = [
      { field: 'TicketStatusID', header: 'TicketStatus ID' },
      { field: 'TicketStatus', header: 'Ticket Status' }
    ];
  }

  ticketTypeDetails() {
    this.columnHeader = [
      { field: 'TicketTypeID', header: 'TicketType ID' },
      { field: 'TicketType', header: 'Ticket Type' },
      { field: 'Description', header: 'Description' }
    ];
  }

  categoryDetails() {
    this.columnHeader = [
      { field: 'CategoryID', header: 'Category ID' },
      { field: 'CategoryName', header: 'Category Name' },
      { field: 'DepartmentID', header: 'Department ID' },
      { field: 'DepartmentName', header: 'Department Name' },
      { field: 'TicketTypeID', header: 'TicketType ID' },
      { field: 'TicketType', header: 'Ticket Type' }
    ];
  }

  appRolesDetails() {
    this.columnHeader = [
      { field: 'RoleID', header: 'Role ID' },
      { field: 'RoleName', header: 'RoleName' },
      { field: 'RoleLandingPage', header: 'Role Landing Page' }
    ];
  }

  appUsersDetails() {
    this.columnHeader = [
      { field: 'UserID', header: 'User ID' },
      { field: 'UserEmail', header: 'User Email' },
      { field: 'Description', header: 'Description' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ];
  }

  appUserRolesDetails() {
    this.columnHeader = [
      { field: 'UserID', header: 'User ID' },
      { field: 'UserName', header: 'User Name' },
      { field: 'RoleID', header: 'Role ID' },
      { field: 'RoleName', header: 'Role Name' },
      { field: 'DepartmentID', header: 'Department ID' },
      { field: 'DepartmentName', header: 'DepartmentName' }
    ];
  }

  onRowEditInit(data: any) {
    //console.log('onRowEditInit', data);
    this.operations[data.id] = { ...data };
  }

  onRowEditSave(data: any, page :any) {
    //console.log("onRowEditSave", this.pageForm.value);

    if (page == 'DM') {
     //console.log("department", this.department);

    } else if (page == 'PT') {
      //console.log(" Priority", this.Priority);
    }
    else if (page == 'TS') {
      this.ticketStatusDetails();
    }
    else if (page == 'TT') {
      this.ticketTypeDetails();
    }
    else if (page == 'CG') {
      this.categoryDetails();
    }
    else if (page == 'AR') {
      this.appRolesDetails();
    }
    else if (page == 'AU') {
      this.appUsersDetails();
    }
    else if (page == 'AUR') {
      this.appUserRolesDetails();
    }

    if (data.price > 0) {
      delete this.operations[data.id];
      this.toastr.success('Updated successfully')
    }
    else {
      this.toastr.error('Invalid Request')
    }
  }

  onRowEditCancel(data: any, index: number) {
    this.operations[index] = this.operations[data.id];
    delete this.operations[data.id];
  }



}
