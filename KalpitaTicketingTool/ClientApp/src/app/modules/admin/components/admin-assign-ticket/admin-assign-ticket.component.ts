import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AdminApiService } from '../../service/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-admin-assign-ticket',
  templateUrl: './admin-assign-ticket.component.html',
  styleUrls: ['./admin-assign-ticket.component.scss'],
})
export class AdminAssignTicketComponent implements OnInit {
  empData: any = [];
  ticketTypes: any = [];
  TicketId: any;
  DepartmentId: any;
  Departments: any = [];
  categories: any = [];
  tickets: any = [];
  isSelf: boolean = true;
  selectedradioValue: any;
  priorities: any;
  PriorityId: any;
  userId: any;
  useremail: any;
  file: any = null;
  dynamicClassNameForFontSize: string = 'normal-col';
  assignToListValidate: any;

  ticket: FormGroup | any;
  public searchInput: String = '';
  public searchResult: Array<any> = [];
  public toggle: Boolean = false;
  public selectedInput: any = {};
  EmployeeList: any;
  onlyImage: boolean = false;
  assignValue: any;
  assignToLoad: boolean = false;

  constructor(
    private admapiservice: AdminApiService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private themeService: ThemeService
  ) {
    this.empData = JSON.parse(sessionStorage.getItem('token')!);
    this.useremail = this.empData.username;
    this.initform();
  }

  ngOnInit(): void {
    var theme = JSON.parse(sessionStorage.getItem('displayTheme')!);
    this.themeService.setTheme(theme);
    this.initform();
    this.getRecentTicket();
    this.getTicketsTypes();
    this.getdepartments();
    this.getPriorities();
    //this.getAssignList();
    this.getEmployeeList();
  }

  getTicketsTypes() {
    this.admapiservice.getAdminTicketTypes().subscribe((data) => {
      this.ticketTypes = data;
      //console.log(this.ticketTypes);
    });
  }
  changeTicketType(_event: any) {
    this.TicketId = _event.target.value;
    //console.log(this.TicketId);
    this.getTicketCategories();
  }

  getdepartments() {
    this.admapiservice.getAdminDepartments().subscribe((data) => {
      this.Departments = data;
      //console.log(this.Departments);
    });
  }
  changeDepartment(_event: any) {
    this.DepartmentId = _event.target.value;
    //console.log(this.DepartmentId);
    this.getTicketCategories();
    this.assignToLoaded();
  }

  assignToLoaded() {
    if (this.DepartmentId) {
      this.admapiservice.getassignlist(this.DepartmentId).subscribe((data) => {
        this.assignValue = data;

        //Set default to clear the previously assigned values
        this.assignToLoad = false;
        this.ticket.get('AssignedToEmail').patchValue('');
        this.ticket
          .get('AssignedToEmail')
          .setValidators([Validators.nullValidator]);
        this.ticket.get('AssignedToEmail').updateValueAndValidity();
        //Set default to clear the previously assigned values

        let value = JSON.parse(sessionStorage.getItem('adminDetails')!);
        if (this.assignValue.length != 0) {
          this.assignValue.forEach((element: any) => {
            if (
              element.userName == value?.userName &&
              element.userEmail == value?.userEmail
            ) {
              this.assignToLoad = true;
              this.ticket.get('AssignedToEmail').patchValue('');
              this.ticket
                .get('AssignedToEmail')
                .setValidators([Validators.required]);
              this.ticket.get('AssignedToEmail').updateValueAndValidity();
            }
          });
        } else {
          this.assignToLoad = false;
          this.ticket.get('AssignedToEmail').patchValue('');
          this.ticket
            .get('AssignedToEmail')
            .setValidators([Validators.nullValidator]);
          this.ticket.get('AssignedToEmail').updateValueAndValidity();
        }
      });
    }
  }

  getTicketCategories() {
    if (this.DepartmentId && this.TicketId) {
      this.admapiservice
        .getadminCategories(this.TicketId, this.DepartmentId)
        .subscribe((data) => {
          this.categories = data;
          //console.log(this.categories);
        });
    }
    this.ticket.get('CategoryID').patchValue('');
    this.ticket.get('CategoryID').setValidators([Validators.required]);
    this.ticket.get('CategoryID').updateValueAndValidity();
  }

  getPriorities() {
    this.admapiservice.getadminPriorites().subscribe((data) => {
      this.priorities = data;
      //console.log(this.priorities);
    });
  }
  changePriorities(_event: any) {
    this.PriorityId = _event.target.value;
    //console.log(this.PriorityId);
  }

  getAssignList() {
    this.admapiservice.getassignlist(this.useremail).subscribe((data) => {
      this.userId = data;
      //console.log(this.userId);
    });
  }

  getRecentTicket() {
    this.admapiservice
      .getRecentTicket(this.empData.username)
      .subscribe((data) => {
        this.tickets = data;
        //console.log(this.tickets);
      });
  }

  imageClear() {
    this.file = [];
    this.ImageAttachments.patchValue(null);
    this.ImageAttachments.updateValueAndValidity();
  }

  radioSelected(event: any) {
    this.selectedradioValue = event.target.value;
    if (this.selectedradioValue == 'self') {
      this.isSelf = true;
      this.ticket.get('CreatedForEmail').reset();
      this.ticket
        .get('CreatedForEmail')
        .setValidators([Validators.nullValidator]);
      this.ticket.get('CreatedForEmail').updateValueAndValidity();
    } else if (this.selectedradioValue == 'others') {
      this.isSelf = false;
      this.ticket.get('CreatedForEmail').setValidators([Validators.required]);
      this.ticket.get('CreatedForEmail').updateValueAndValidity();
    }
  }

  initform() {
    this.isSelf = true;
    this.ticket = this.formBuilder.group({
      TicketTypeID: ['', [Validators.required]],
      DepartmentID: ['', [Validators.required]],
      CategoryID: ['', [Validators.required]],
      CreatedForEmail: ['', [Validators.nullValidator]],
      CreatedForName: ['', [Validators.nullValidator]],
      CreatedByName: [this.empData.name, [Validators.nullValidator]],
      CreatedByEmail: [this.empData.username, [Validators.nullValidator]],
      self: ['self', [Validators.nullValidator]],
      others: ['', [Validators.nullValidator]],
      othersIp: ['', [Validators.nullValidator]],
      TicketTitle: ['', [Validators.required]],
      PriorityID: ['', [Validators.required]],
      AssignedToEmail: ['', [Validators.required]],
      TicketComment: ['', [Validators.required]],
      ImageAttachments: ['', [Validators.nullValidator]],
    });
  }

  get TicketTypeID() {
    return this.ticket.get('TicketTypeID');
  }
  get DepartmentID() {
    return this.ticket.get('DepartmentID');
  }
  get CategoryID() {
    return this.ticket.get('CategoryID');
  }
  get self() {
    return this.ticket.get('self');
  }
  get others() {
    return this.ticket.get('others');
  }
  get CreatedForEmail() {
    return this.ticket.get('CreatedForEmail');
  }
  get TicketTitle() {
    return this.ticket.get('TicketTitle');
  }
  get PriorityID() {
    return this.ticket.get('PriorityID');
  }

  get TicketComment() {
    return this.ticket.get('TicketComment');
  }

  get ImageAttachments() {
    return this.ticket.get('ImageAttachments');
  }

  public userExists(data: any) {
    if(data == ""){
      return false;
    }
    else{
      return this.EmployeeList.some((item :any) =>{
        return item.userEmail === data;
      }); 
    }
  }


  ticketdata(data: any) {
    var log = true;
    if (this.isSelf) {
        log = true;
    } else {
        log = this.userExists(data.CreatedForEmail)
    }
    
    // console.log(data)

    // console.log(this.ticket.valid && log);
    

    if (this.ticket.valid && log) {
      const formdata = new FormData();
      formdata.append('TicketTypeID', this.ticket.value.TicketTypeID);
      formdata.append('DepartmentID', this.ticket.value.DepartmentID);
      formdata.append('CategoryID', this.ticket.value.CategoryID);
      formdata.append('CreatedForEmail', this.ticket.value.CreatedForEmail);
      formdata.append('CreatedForName', this.ticket.value.CreatedForName);
      formdata.append('TicketTitle', this.ticket.value.TicketTitle);
      formdata.append('PriorityID', this.ticket.value.PriorityID);
      formdata.append('CreatedByName', this.ticket.value.CreatedByName);
      formdata.append('AssignedToEmail', this.ticket.value.AssignedToEmail);
      formdata.append('CreatedByEmail', this.ticket.value.CreatedByEmail);
      formdata.append('TicketComment', this.ticket.value.TicketComment);
      if (this.file) {
        for (let i = 0; i < this.file?.length; i++) {
          formdata.append('ImageAttachments', this.file[i]);
        }
      }

      this.admapiservice.assignTicket(formdata).subscribe({
        next: (formdata: any) => {
          this.toastr.success('Ticket created successfully');
          //console.log(formdata);
          this.ticket.reset();
          this.getRecentTicket();
          this.initform();
        },
        error: () => {
          this.toastr.error('Failed to create ticket');
        },
      });
    } else {
      if (! log) {
        this.toastr.error('Please enter the required fields / proper raised for email');
    } else {
        this.toastr.error('Please enter the required fields');
    }
    }
  }

  onChange(event: any) {
    this.file = event.target.files;
    const formData: any = [];
    if (this.file?.length > 0) {
      for (let i = 0; i < this.file?.length; i++) {
        var mimeType = this.file[i].type;
        if (mimeType.match(/image\/*/) == null) {
          this.onlyImage = true;
        } else {
          formData.push(this.file[i]);
        }
      }
      if (this.onlyImage) {
        this.onlyImage = false;
        this.toastr.error('Only images are supported.');
      }
      this.file = [];
      this.file = formData;
    }
  }

  getEmployeeList() {
    this.admapiservice.getAdminEmployee().subscribe((data: any) => {
      this.EmployeeList = data.filter(
        (user: { userEmail: any }) => user.userEmail != this.useremail
      );
      //console.log(this.EmployeeList);
    });
  }

  searchInputvalues(value?: any): any {
    if (value === '') {
      return (this.searchResult = []);
    }
    this.searchResult = this.EmployeeList.filter((res: any) => {
      return res.userEmail.toLowerCase().startsWith(value.toLowerCase());
    });

    this.toggle = false;
  }

  showDetails(series: any) {
    this.selectedInput = series;
    this.toggle = true;
    this.searchInput = series.userEmail;
    this.ticket.get('CreatedForEmail').patchValue(series.userEmail);
    this.ticket.get('CreatedForEmail').updateValueAndValidity();
    this.ticket.get('CreatedForName').patchValue(series.userName);
    this.ticket.get('CreatedForName').updateValueAndValidity();
  }

  applyDynamicClassForFontSize(className: string) {
    this.dynamicClassNameForFontSize = className;
  }
}
