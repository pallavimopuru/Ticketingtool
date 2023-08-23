import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { admin_url } from '../../configs/admin-url-configs';
import { AdminApiService } from '../../service/admin-api.service';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-admin-view-ticket',
  templateUrl: './admin-view-ticket.component.html',
  styleUrls: ['./admin-view-ticket.component.css'],
})
export class AdminViewTicketComponent implements OnInit {
  id: any;
  TicketData: any = [];
  comments: any;
  item: any;
  Assignto: any;
  useremail: any;
  empData: any;
  AssignuserId: any = [];
  ticketStaus: any = [];
  ticketStatusID: any;
  isSubmit = false;
  isaddSubmit = false;
  assignlistDefaultIndex: any;
  statusDefaultIndex: any;
  userform: FormGroup | any;
  userformcomment: FormGroup | any;
  status: any;
  DownloadApiURL = admin_url.download_file;
  public loggedUserDepartment: any =[];
  public disabledFields: boolean = false;

  constructor(
    private adminapiservice: AdminApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private themeService: ThemeService
  ) {
    this.empData = JSON.parse(sessionStorage.getItem('token')!);
    this.useremail = this.empData.username;
  }

  ngOnInit(): void {
    var theme = JSON.parse(sessionStorage.getItem('displayTheme')!);
    this.themeService.setTheme(theme);

    var adminValues = JSON.parse(sessionStorage.getItem('adminDetails')!);
    this.loggedUserDepartment = adminValues?.departmentName.split(",");

    this.getTicketbyId('init');

    this.getCommentList();
    this.getStatus();
  }

  initFrom(data?: any) {
    this.userform = this.fb.group({
      ticketID: [
        data?.ticketID ? data.ticketID : '',
        [Validators.nullValidator],
      ],
      ticketDupID: [
        data?.ticketDupID ? data.ticketDupID : '',
        [Validators.nullValidator],
      ],
      userEmail: [
        this.empData.username ? this.empData.username : '',
        [Validators.nullValidator],
      ],
      assignedTo: [
        data?.assignedToEmail ? data.assignedToEmail : '',
        [Validators.required],
      ],
      ticketComment: ['', [Validators.required]],
      ticketStatusID: [
        data?.ticketStatusID ? data.ticketStatusID : '',
        [Validators.required],
      ],
    });

    this.userformcomment = this.fb.group({
      ticketID: [
        data?.ticketID ? data.ticketID : '',
        [Validators.nullValidator],
      ],
      ticketDupID: [
        data?.ticketDupID ? data.ticketDupID : '',
        [Validators.nullValidator],
      ],
      userEmail: [
        this.empData.username ? this.empData.username : '',
        [Validators.nullValidator],
      ],
      assignedTo: [
        data?.assignedToEmail ? data.assignedToEmail : '',
        [Validators.nullValidator],
      ],
      additionalComment: ['', [Validators.required]],
      ticketStatusID: [
        data?.ticketStatusID ? data.ticketStatusID : '',
        [Validators.nullValidator],
      ],
    });
    // console.log(' this.userform', this.userform);
  }

  ticketDetails = new FormGroup({
    assignto: new FormControl('', [Validators.required]),
    ticketstatus: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required]),
  });
  get assignto() {
    return this.ticketDetails.get('assignto');
  }
  get ticketstatus() {
    return this.ticketDetails.get('ticketstatus');
  }

  get comment() {
    return this.ticketDetails.get('comment');
  }

  getTicketbyId(data?: string) {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('ticketId');
        if (this.id) {
          this.adminapiservice.getTicketById(this.id).subscribe({
            next: (result) => {
              this.TicketData = result;
              //console.log('TicketData', this.TicketData);
              this.initFrom(this.TicketData?.ticketData);
              if (data) this.getAssignList();
              if (data) this.enableDisableFunction();
            },
            error: () => {
              //console.log('Invalid Request');
            },
          });
        }
      },
    });
  }

  getCommentList() {
    this.adminapiservice.getCommentById(this.id).subscribe((data) => {
      this.comments = data;
      //console.log(this.comments);
    });
  }

  getAssignList() {
    var DepartmentID = this.TicketData?.ticketData?.departmentID;
    //console.log('DepartmentID', DepartmentID);
    this.adminapiservice.getassignlist(DepartmentID).subscribe((data) => {
      this.AssignuserId = data;
      //console.log('getAssignList', data);
    });
  }

  getStatus() {
    this.adminapiservice.getStatus().subscribe((data) => {
      this.ticketStaus = data;
      //console.log(this.ticketStaus);
      const search = (obj: { ticketStatusID: any }) =>
        obj.ticketStatusID === this.TicketData?.ticketData?.ticketStatusID;
      this.statusDefaultIndex = this.ticketStaus.findIndex(search);
      //console.log(this.statusDefaultIndex);
    });
  }
  changeStatus(_event: any) {
    this.ticketStatusID = _event.target.value;
    //console.log(this.ticketStatusID);
    this.getStatus();
  }

  sendTicketComment(data: any) {
    //console.log('value', this.userformcomment);
    this.isaddSubmit = true;
    if (this.userformcomment.valid) {
      var sendValue = {
        ticketID: this.userformcomment.get('ticketID').value,
        ticketDupID: this.userformcomment.get('ticketDupID').value,
        userEmail: this.userformcomment.get('userEmail').value,
        assignedTo: this.userformcomment.get('assignedTo').value,
        ticketComment: this.userformcomment.get('additionalComment').value,
        ticketStatusID: Number(this.userformcomment.value?.ticketStatusID),
      };
      this.adminapiservice.postComent(sendValue).subscribe({
        next: (result: any) => {
          if (!result.isError) {
            this.userformcomment.get('additionalComment').reset();
            this.userformcomment
              .get('additionalComment')
              .updateValueAndValidity();
            this.isaddSubmit = false;
            this.toastr.success(result?.message);
            //console.log('done');
          }
          this.getCommentList();
          //console.log(result);
        },
      });
    } else {
      this.toastr.error('Please enter the additional comment field');
    }
  }

  updateTicket(data: any) {
    this.userform.get('ticketComment').setValue(data);
    this.userform.get('ticketComment').updateValueAndValidity();
    this.isSubmit = true;
    //console.log('this.userform.valid', this.userform);
    //console.log('this.userform.valid', this.userform.get('ticketStatusID').pristine);

    if (this.userform.valid) {
      if (
        this.userform.get('assignedTo').pristine &&
        this.userform.get('ticketStatusID').pristine
      ) {
        this.toastr.error('Please change Assign To or Status field');
        return;
      }
      this.userform
        .get('ticketStatusID')
        .setValue(Number(this.userform.value?.ticketStatusID));
      this.userform.get('ticketStatusID').updateValueAndValidity();
      delete this.userform.value?.additionalComment;
      //console.log('valid', this.userform.value);
      this.adminapiservice.updateTicket(this.userform.value).subscribe({
        next: (result: any) => {
          if (!result.isError) {
            this.userform.get('ticketComment').reset();
            this.userform.get('ticketComment').updateValueAndValidity();
            this.isSubmit = true;
            this.toastr.success(result?.message);
          } else {
            this.toastr.error(result?.message);
          }
          this.getCommentList();
          this.getAssignList();
          this.getTicketbyId();
        },
      });
    } else {
      this.toastr.error('Please enter the required fields');
    }
  }

  public enableDisableFunction() {
    var departmentName = this.TicketData?.ticketData?.departmentName;
    if (this.loggedUserDepartment.includes(departmentName)) {
        this.disabledFields = false;
        this.userform.get('assignedTo').enable();
        this.userform.get('ticketStatusID').enable();
        this.userform.get('ticketComment').enable();
        this.userformcomment.get('additionalComment').enable();
        
    } else {
        this.disabledFields = true;
        this.toastr.warning('You are not authorized to modify');
        this.userform.get('assignedTo').disable();
        this.userform.get('ticketStatusID').disable();
        this.userform.get('ticketComment').disable();
        this.userformcomment.get('additionalComment').disable();
    }    
}
}
