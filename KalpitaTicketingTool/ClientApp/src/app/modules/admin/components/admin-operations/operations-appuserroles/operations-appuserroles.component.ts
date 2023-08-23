import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from '../../../service/admin-api.service';
import { AdminOperationApiService } from '../../../service/admin-operation-api';

@Component({
  selector: 'app-operations-appuserroles',
  templateUrl: './operations-appuserroles.component.html',
  styleUrls: ['./operations-appuserroles.component.css']
})
export class OperationsAppuserrolesComponent implements OnInit {



  @ViewChild('docDataTable', { static: false }) private docDataTable: any;
  columnHeader: any[] = [];
  operations: any[] = [];
  defaultStatus:any='A'
  statusOptions = [{label :"Active", value: "A"},{label :"Deactive", value: "D"}];
  AddOneRow = 1;

  AppUserRoles: FormGroup | any;
  departmentOperations: any[] = [];
  userList: any[] = [];
  RolesList: any[] = [];
  departList: any[] = [];
  loading: boolean | any;
  editIsOpen: boolean = false;
  alreadyEditIsOpen: boolean = false;
  appuserRolesDetails: any;
  appuser: any;

  get form() {
    return this.AppUserRoles['controls'];
  }

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder, private Api: AdminOperationApiService,

  ) { }

  ngOnInit(): void {
    this.AppUserRolesHeader();
    this.initialForm();
    this.AppUserRolesDetails();
    //console.log("form", this.form);

  }

  AppUserRolesDetails() {
    this.loading = true;
    this.Api.getOperations('AppUserRoles').subscribe((res: any) => {
      this.appuserRolesDetails = res;
      res.forEach((element: any, i: any) => {
        delete element['userID'];
        delete element['roleID'];
        delete element['departmentID'];
      });

      if (res) {
        this.operations = res;
        //console.log("getOperations", res);
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    });

    this.Api.getOperations('AppUsers').subscribe((user: any) => {
      if (user) {
        this.userList = [];
        user.map((res: any) => {
          if (res.status == "A") {
            this.userList.push(res);
          };
        });

      }
    });

    this.Api.getOperations('AppRoles').subscribe((roles: any) => {
      if (roles) {
        this.RolesList = [];
        roles.map((res: any) => {
          if (res.status == "A") {
            this.RolesList.push(res);
          };
        });
      }
    });

    this.Api.getOperations('Department').subscribe((depart: any) => {
      if (depart) {
        this.departList = [];
        depart.map((res: any) => {
          if (res.status == "A") {
            this.departList.push(res);
          };
        });
      }
    });


  }


  initialForm() {
    this.AppUserRoles = this.formBuilder.group({
      "id": new FormControl('', Validators.nullValidator),
      'userID': new FormControl('', Validators.required),
      'userName': new FormControl('', Validators.required),
      'roleID': new FormControl('', Validators.required),
      'roleName': new FormControl('', Validators.required),
      'departmentID': new FormControl('', Validators.required),
      'departmentName': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.required),
    });
  }


  AppUserRolesHeader() {
    this.columnHeader = [
      { field: 'id', header: 'User Role ID',width: '100px'},
      { field: 'userName', header: 'User Name',width: '300px' },
      { field: 'roleName', header: 'Role Name',width: '300px' },
      { field: 'departmentName', header: 'Department Name',width: '300px' },
      { field: 'status', header: 'Status',width: '150px' }
    ];
  }

  onChange(data: any, field: any) {
   // console.log("data", data?.target?.value, "field", field);
    if (field === 'userName') {
      this.userList.forEach(res => {
        if (Number(res.userID) == Number(data?.target?.value)) {
          this.AppUserRoles.patchValue({ userID: Number(res.userID) });
          this.AppUserRoles.patchValue({ userName: res.userName, });
          this.AppUserRoles.get('userID').updateValueAndValidity();
          this.AppUserRoles.get('userName').updateValueAndValidity();
          //console.log("userID", this.AppUserRoles.get('userID').value);
          //console.log("userName", this.AppUserRoles.get('userName').value);

        }
      })
    } else if (field === 'roleName') {
      this.RolesList.forEach(res => {
        if (Number(res.roleID) == Number(data?.target?.value)) {
          this.AppUserRoles.patchValue({ roleID: Number(res.roleID) });
          this.AppUserRoles.patchValue({ roleName: res.roleName, });
          this.AppUserRoles.get('roleID').updateValueAndValidity();
          this.AppUserRoles.get('roleName').updateValueAndValidity();
        }
      })
    } else if (field === 'departmentName') {
      this.departList.forEach(res => {
        if (Number(res.departmentID) == Number(data?.target?.value)) {
          this.AppUserRoles.patchValue({ departmentID: Number(res.departmentID) });
          this.AppUserRoles.patchValue({ departmentName: res.departmentName, });
          this.AppUserRoles.get('departmentID').updateValueAndValidity();
          this.AppUserRoles.get('departmentName').updateValueAndValidity();
        }
      })
    }

  }



  onRowEditInit(data: any) {
    //console.log("data", data);
    if (data.userName) {
      this.userList.forEach(res => {
        if (data.userName == res.userName) {
          this.AppUserRoles.patchValue({ userID: res.userID });
          this.AppUserRoles.patchValue({ userName: res.userName, });
          this.AppUserRoles.get('userID').updateValueAndValidity();
          this.AppUserRoles.get('userName').updateValueAndValidity();
        }
      })
    }

    if (data.roleName) {
      this.RolesList.forEach(res => {
        if (data.roleName == res.roleName) {
          this.AppUserRoles.patchValue({ roleID: res.roleID });
          this.AppUserRoles.patchValue({ roleName: res.roleName, });
          this.AppUserRoles.get('roleID').updateValueAndValidity();
          this.AppUserRoles.get('roleName').updateValueAndValidity();

        }
      })
    }

    if (data.departmentName) {
      this.departList.forEach(res => {
        if (data.departmentName == res.departmentName) {
          this.AppUserRoles.patchValue({ departmentID: res.departmentID });
          this.AppUserRoles.patchValue({ departmentName: res.departmentName, });
          this.AppUserRoles.get('departmentID').updateValueAndValidity();
          this.AppUserRoles.get('departmentName').updateValueAndValidity();
        }
      })
    }

    this.AppUserRoles.patchValue({ 'id': data.id })
    this.AppUserRoles.patchValue({ status: data.status });
    this.AppUserRoles.get('id').updateValueAndValidity();
    this.AppUserRoles.get('userID').updateValueAndValidity();
    this.AppUserRoles.get('userName').updateValueAndValidity();
    this.AppUserRoles.get('roleID').updateValueAndValidity();
    this.AppUserRoles.get('roleName').updateValueAndValidity();
    this.AppUserRoles.get('departmentID').updateValueAndValidity();
    this.AppUserRoles.get('departmentName').updateValueAndValidity();
    this.AppUserRoles.updateValueAndValidity();
    this.operations[data.value] = { ...data };
    this.editIsOpen = true;
    this.alreadyEditIsOpen = true;

  }

  addRow() {
    if (!this.editIsOpen) {
      if (this.AddOneRow == 1) {
        this.AppUserRoles.reset();
        this.AppUserRoles.patchValue({ id: 0, });
        this.AppUserRoles.patchValue({ userID: "", });
        this.AppUserRoles.patchValue({ userName: "" });
        this.AppUserRoles.patchValue({ roleID: "" });
        this.AppUserRoles.patchValue({ roleName: "" });
        this.AppUserRoles.patchValue({ departmentID: "" });
        this.AppUserRoles.patchValue({ departmentName: "" });
        this.AppUserRoles.patchValue({ status: "" });
        this.AppUserRoles.updateValueAndValidity();
        var newArray: any = [];
        newArray.push(this.AppUserRoles.value);
        for (var i = 0; i < this.operations.length; i++) {
          this.operations[i].Serialnumber = i + 2;
          newArray.push(this.operations[i]);
        }
        this.operations = newArray;
        this.docDataTable.initRowEdit(this.operations[0]);
        this.AddOneRow = 2;
        this.alreadyEditIsOpen = true;
      } else {
        if (!this.AppUserRoles.valid) {
          this.toastr.error('Please fill in all fields')
        }
      }
    } else {
      this.toastr.error('Please complete your edit process');
    }
  }

  EditOpen() {
    this.toastr.error('Please complete your process');
  }

  onRowEditSave() {
    //console.log("this.AppUserRoles.valid", this.AppUserRoles.value);
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;

    if (this.AppUserRoles.valid) {

      if (this.AddOneRow == 1 && this.AppUserRoles.touched) {
        this.Api.updateOperations(this.AppUserRoles.value, 'AppUserRoles').subscribe((res: any) => {
          if (!res?.isError) {
            this.AppUserRolesDetails();
            this.toastr.success(res?.message);
          } else {
            this.AppUserRolesDetails();
            this.toastr.error(res?.message);
          }
        });
      }

      if (this.AddOneRow == 2) {
        this.Api.addOperations(this.AppUserRoles.value, 'AppUserRoles').subscribe((res: any) => {
          if (!res?.isError) {
            this.AppUserRolesDetails();
            this.AddOneRow = 1;
            this.toastr.success(res?.message);
          } else {
            this.AddOneRow = 1;
            this.AppUserRolesDetails();
            this.toastr.error(res?.message);
          }
        });
      }

    } else {
      this.toastr.error('Please fill in all fields')
    }
  }

  onRowEditCancel() {
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;

    this.AppUserRolesDetails();
    if (this.AddOneRow == 2) {
      this.AddOneRow = 1;
    }
  }


}
