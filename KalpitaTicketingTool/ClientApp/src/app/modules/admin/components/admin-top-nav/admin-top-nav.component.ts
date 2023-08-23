import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AdminApiService } from '../../service/admin-api.service';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-admin-top-nav',
  templateUrl: './admin-top-nav.component.html',
  styleUrls: ['./admin-top-nav.component.css'],
})
export class AdminTopNavComponent implements OnInit {
  empData: any = [];
  initials: any;
  userName: any;
  photo: any;
  bool: boolean = false;
  error: any;
  companydata: any;

  constructor(
    private msalService: MsalService,
    private router: Router,
    private adminapiservice: AdminApiService,
    private themeService: ThemeService
  ) {
    this.empData = JSON.parse(sessionStorage.getItem('token')!);
    //console.log(this.empData);

    let anExampleVariable = this.empData.name;

    let fullName = anExampleVariable.split(' ');

    this.initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);

    let SlpitName = this.empData.name;

    let SlpitedName = SlpitName.split(' ');
    this.userName = SlpitedName[0];
  }

  ngOnInit(): void {
    this.callCompanyName();
    this.callProfile();
  }

  changeTheme(name: string) {
    this.themeService.setTheme(name);

    let value = JSON.parse(sessionStorage.getItem('adminDetails')!);
    let obj = {
      userEmail: value?.userEmail,
      userTheme: name,
    };

    this.adminapiservice.adminAddTheme(obj).subscribe((res: any) => {
      // console.log(res);
      if (!res?.['isError']) {
        sessionStorage.setItem('displayTheme', JSON.stringify(name));
      }
    });
  }

  callProfile() {
    this.adminapiservice.getpicture().subscribe({
      next: (photo: any) => {
        this.photo = photo;
        this.bool = false;
      },
      error: (err: any) => {
        this.error = err;
        this.bool = true;
        // this.getInitials();
      },
    });
    //console.log(this.photo);
  }

  getInitials() {
    return this.initials;
  }
  callCompanyName() {
    this.adminapiservice.getcompanyName().subscribe((data) => {
      this.companydata = data;
      //console.log('this.companydata', this.companydata);
    });
  }

  logout() {
    this.msalService.logoutRedirect();
    // this.msalService.instance.loginRedirect();
    this.navigateToFrontPage();
    sessionStorage.clear();
  }

  navigateToFrontPage() {
    let url = '/sign-in';
    this.router.navigateByUrl(url);
  }
}
