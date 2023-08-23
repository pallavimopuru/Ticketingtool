import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from '../../services/user-api.service';
import { ToastrService } from 'ngx-toastr';
import { user_url } from '.././../configs/user-url-config';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-user-view-ticket',
  templateUrl: './user-view-ticket.component.html',
  styleUrls: ['./user-view-ticket.component.css'],
})
export class UserViewTicketComponent implements OnInit {
  id: any;
  TicketData: any = [];
  comments: any = [];
  empData: any = [];
  isShown: any;
  DownloadApiURL: any;

  reopenData: FormGroup | any;
  additionalComment : FormGroup | any;

  get comment() {
    return this.additionalComment.get('comment');
  }

  constructor(
    private route: ActivatedRoute,
    private userapiservice: UserApiService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private themeService:ThemeService,
  ) {
    this.empData = JSON.parse(sessionStorage.getItem('token')!);
    this.DownloadApiURL = this.userapiservice.downloadFile();
  }

  ngOnInit(): void {
      //This piece of code where Theme is being set should be always present in the First Route Component
      var theme = JSON.parse(sessionStorage.getItem('displayTheme')!);
      this.themeService.setTheme(theme);
       //This piece of code where Theme is being set should be always present in the First Route Component
    this.getTicketbyId();
    this.getCommnetList();
    this.addCommentform();
  }

  initFrom() {
    this.reopenData = new FormGroup({
      reopenComment: new FormControl('', [Validators.required]),
    });
  }

  getTicketbyId() {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('ticketId');
        if (this.id) {
          this.userapiservice.getTicketById(this.id).subscribe({
            next: (result) => {
              this.TicketData = result;
              // console.log(this.TicketData);
              this.isShown = this.TicketData.ticketData.isReopen;
              if (this.isShown) {
                this.initFrom();
              }
            },

            error: () => {
              // console.log('Invalid Request');
            },
          });
        }
      },
    });
  }


  addCommentform(){
    this.additionalComment = new FormGroup({
      comment: new FormControl('', [Validators.required]),
    });
  }




  getCommnetList() {
    this.userapiservice.getCommentById(this.id).subscribe((data) => {
      this.comments = data;
    });
  }

  sendComment(data: any) {
    // console.log('data', data);

    if (data) {
      let obj = {
        ticketID: this.TicketData.ticketData.ticketID,
        ticketDupID: this.TicketData.ticketData.ticketDupID,
        userEmail: this.empData.username,
        assignedTo: this.TicketData.ticketData.assignedTo,
        ticketComment: data,
        ticketStatusID: this.TicketData.ticketData.ticketStatusID,
      };
      this.userapiservice.postComent(obj).subscribe({
        next: (result: any) => {
          if (!result.isError) {
            this.toastr.success(result?.message);
            this.addCommentform();
            this.getCommnetList();
          } 
        },error: () => {
          this.toastr.error('Failed to add comment');
        },
      });
    } else {
      this.toastr.error('Please enter additional comment field');
    }
  }
//Updated with Additional comment changes
  reopenTicket(data: any) {
    // console.log('data?.reopenComment', data?.reopenComment);

    if (data?.reopenComment) {
      let obj = {
        ticketID: this.TicketData.ticketData.ticketID,
        ticketDupID: this.TicketData.ticketData.ticketDupID,
        userEmail: this.empData.username,
        assignedTo: this.TicketData.ticketData.assignedToEmail,
        ticketComment: data.reopenComment,
        ticketStatusID: this.TicketData.ticketData.ticketStatusID,
      };
      // console.log(obj);
      this.userapiservice.reopenTicket(obj).subscribe({
        next: (result: any) => {
          this.initFrom();
          this.getTicketbyId();
          this.getCommnetList();
          this.toastr.success('Ticket re-opened Succesfully');
        },
        error: () => {
          this.toastr.error('Failed re-open ticket');
        },
      });
    } else {
      this.toastr.error('Please enter the comment field');
    }
  }
}
