import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from '../../../service/admin-api.service';
import { AdminOperationApiService } from '../../../service/admin-operation-api';

@Component({
  selector: 'app-operations-appusers',
  templateUrl: './operations-appusers.component.html',
  styleUrls: ['./operations-appusers.component.css']
})
export class OperationsAppusersComponent implements OnInit {


  @ViewChild('docDataTable', { static: false }) private docDataTable: any;
  columnHeader: any[] = [];
  operations: any[] = [];
  defaultStatus:any='A'
  statusOptions = [{label :"Active", value: "A"},{label :"Deactive", value: "D"}];
  AddOneRow = 1;
  loading: boolean | any;
  AppUsers: FormGroup | any;
  editIsOpen: boolean = false;
  alreadyEditIsOpen: boolean = false;
  userList: any[] = [];
  get form() {
    return this.AppUsers['controls'];
  }

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder, private Api: AdminOperationApiService,
    private adminApi: AdminApiService
  ) { }

  ngOnInit(): void {
    this.AppUsersHeader();
    this.initialForm();
    this.AppUsersDetails();

  }

  AppUsersDetails() {
    this.loading = true;
    this.Api.getOperations('AppUsers').subscribe((res: any) => {
      //console.log("getOperations", res);
      if (res) {
        for (var i = 0; i < res.length; i++) {
          res[i]['Serialnumber'] = i + 1;
        }
        this.operations = res;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }

    });

    this.adminApi.getAdminRoles().subscribe((user: any) => {
      if (user) {
        user.map((res: any, index: number) => {
          res['userID'] = index + 1;
        });
        this.userList = user;
        //console.log("user", this.userList);

      }
    });

  }

  EditOpen() {
    this.toastr.error('Please complete your process');
  }

  onChange(data: any, field: any) {
    //console.log("data", data?.target?.value, "field", field);
    if (field === 'userName') {
      this.userList.forEach(res => {
        if (Number(res.userID) == Number(data?.target?.value)) {
          this.AppUsers.patchValue({ userEmail: res.userEmail });
          this.AppUsers.patchValue({ userName: res.userName, });
          this.AppUsers.get('userName').updateValueAndValidity();
          this.AppUsers.get('userEmail').updateValueAndValidity();
          //console.log("userEmail", this.AppUsers.get('userEmail').value);
          //console.log("userName", this.AppUsers.get('userName').value);

        }
      })
    }

  }


  initialForm() {
    this.AppUsers = this.formBuilder.group({
      'userID': new FormControl(0, Validators.nullValidator),
      'userEmail': new FormControl('', Validators.required),
      'userName': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.nullValidator),
      'status': new FormControl('', Validators.nullValidator),
    });
  }


  AppUsersHeader() {
    this.columnHeader = [
      { field: 'userID', header: 'User ID' ,width: '150px'},
      { field: 'userName', header: 'User Name',width: '300px' },
      { field: 'userEmail', header: 'User Email',width: '450px' },
      { field: 'status', header: 'Status',width: '200px' }
    ];
  }


  onRowEditInit(data: any) {
    //console.log("onRowEditInit", data);

    var UserbindingID = 0;
    this.userList.forEach(res => {
      if (res.userEmail === data.userEmail) {
        UserbindingID = res.userID
      }
    });
    //console.log("UserbindingID",UserbindingID);

    this.AppUsers.patchValue({ name: UserbindingID, });
    this.AppUsers.patchValue({ userID: data.userID, });
    this.AppUsers.patchValue({ userEmail: data.userEmail });
    this.AppUsers.patchValue({ userName: data.userName });
    this.AppUsers.patchValue({ status: data.status });
    this.AppUsers.get('name').updateValueAndValidity();
    this.AppUsers.get('userID').updateValueAndValidity();
    this.AppUsers.get('userEmail').updateValueAndValidity();
    this.AppUsers.get('userName').updateValueAndValidity();
    this.AppUsers.get('status').updateValueAndValidity();
    this.operations[data.id] = { ...data };
    this.editIsOpen = true;
    this.alreadyEditIsOpen = true;
  }

  addRow() {
    if (!this.editIsOpen) {
      if (this.AddOneRow == 1) {
        this.AppUsers.reset();
        this.AppUsers.patchValue({ userID: 0, });
        this.AppUsers.patchValue({ userEmail: "" });
        this.AppUsers.patchValue({ userName: "" });
        this.AppUsers.patchValue({ status: "" });
        this.AppUsers.patchValue({ name: "" });
        this.AppUsers.updateValueAndValidity();
        var newArray: any = [];
        newArray.push(this.AppUsers.value);
        for (var i = 0; i < this.operations.length; i++) {
          this.operations[i].Serialnumber = i + 2;
          newArray.push(this.operations[i]);
        }
        this.operations = newArray;
        this.docDataTable.initRowEdit(this.operations[0]);
        this.AddOneRow = 2;
        this.alreadyEditIsOpen = true;
      } else {
        if (!this.AppUsers.valid) {
          this.toastr.error('Please fill in all fields')
        }
      }
    } else {
      this.toastr.error('Please complete your edit process');
    }
  }

  onRowEditSave() {
    //console.log("this.AppUsers.valid", this.AppUsers.value);
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;

    if (this.AppUsers.valid) {

      if (this.AddOneRow == 1 && this.AppUsers.touched) {
        this.Api.updateOperations(this.AppUsers.value, 'AppUsers').subscribe((res: any) => {
          if (!res?.isError) {
            this.AppUsersDetails();
            this.toastr.success(res?.message);
          } else {
            this.AppUsersDetails();
            this.toastr.error(res?.message);
          }
        });
      }

      if (this.AddOneRow == 2) {
        this.Api.addOperations(this.AppUsers.value, 'AppUsers').subscribe((res: any) => {
          if (!res?.isError) {
            this.toastr.success(res?.message);
          } else {
            this.toastr.error(res?.message);
          }
          this.AppUsersDetails();
          this.AddOneRow = 1;
        });
      }

    } else {
      this.toastr.error('Please fill in all fields')
    }
  }

  onRowEditCancel() {
    this.AppUsersDetails();
    if (this.AddOneRow == 2) {
      this.AddOneRow = 1;
    }
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;
  }


}
