import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { SignInService } from '../service/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  userdata: any = [];


  response: any = [];



  constructor(private msalService: MsalService, private signinservice: SignInService, private router: Router,) {

  }

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if (res != null && res.account != null) {
          this.msalService.instance.setActiveAccount(res.account)
          this.userdata = res.account;

          // console.log("token",this.userdata)
          sessionStorage.setItem('token', JSON.stringify(this.userdata));


          this.loginUser()
        }
      }
    )
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  login() {
    this.msalService.loginRedirect();
    // this.msalService.loginPopup().subscribe((response:any) => {
    //   this.msalService.instance.setActiveAccount(response.account)
    // })
  }

  // logout(){
  //   this.msalService.logout();
  //   sessionStorage.clear();
  // }

  loginUser() {
    this.signinservice.addloginAPI(this.userdata.username).subscribe(
      ((data: any) => {
        this.response = data;
        // console.log("User Role",this.response);

        if(this.response[0]?.roleName == 'USER'){
          sessionStorage.setItem('userDetails', JSON.stringify(this.response[0]));
          let value = JSON.parse(sessionStorage.getItem('userDetails')!);
          var theme = value?.userTheme;
          sessionStorage.setItem('displayTheme', JSON.stringify(theme));
        }
        if(this.response[0]?.roleName == 'ADMIN' || this.response[0]?.roleName == "SUPERADMIN"){
          sessionStorage.setItem('adminDetails', JSON.stringify(this.response[0]));
          let value = JSON.parse(sessionStorage.getItem('adminDetails')!);
          var theme = value?.userTheme;
          sessionStorage.setItem('displayTheme', JSON.stringify(theme));
        }
        let url = this.response[0]?.roleLandingPage;
        this.router.navigateByUrl(url);
      }));
  }
}



