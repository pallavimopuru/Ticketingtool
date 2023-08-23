import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminOperationApiService } from '../../../service/admin-operation-api';

@Component({
  selector: 'app-operations-approles',
  templateUrl: './operations-approles.component.html',
  styleUrls: ['./operations-approles.component.css']
})
export class OperationsApprolesComponent implements OnInit {


  @ViewChild('docDataTable', { static: false }) private docDataTable: any;
  columnHeader: any[] = [];
  operations: any[] = [];
  defaultStatus:any='A'
  statusOptions = [{label :"Active", value: "A"},{label :"Deactive", value: "D"}];
  AddOneRow = 1;

  AppRoles: FormGroup | any;
  loading: boolean | any;
  editIsOpen: boolean = false;
  alreadyEditIsOpen: boolean = false;

  get form() {
    return this.AppRoles['controls'];
  }

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder, private Api: AdminOperationApiService,
  ) { }

  ngOnInit(): void {
    this.AppRolesHeader();
    this.initialForm();
    this.AppRolesDetails();
  }

  AppRolesDetails() {
    this.loading = true;
    this.Api.getOperations('AppRoles').subscribe((res: any) => {
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

  }

  onChange(data?: any) {
    //console.log("data", data);
  }


  initialForm() {
    this.AppRoles = this.formBuilder.group({
      'roleID': new FormControl(0, Validators.nullValidator),
      'roleName': new FormControl('', Validators.required),
      'roleLandingPage': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.required),
    });
  }

  EditOpen(){
    this.toastr.error('Please complete your process');
  }

  AppRolesHeader() {
    this.columnHeader = [
      { field: 'roleID', header: 'Role ID' },
      { field: 'roleName', header: 'Role Name' },
      { field: 'roleLandingPage', header: 'Role Landing Page' },
      { field: 'status', header: 'Status' }
    ];
  }


  onRowEditInit(data: any) {
    //console.log("onRowEditInit", data);
    this.AppRoles.patchValue({ roleID: data.roleID, });
    this.AppRoles.patchValue({ roleName: data.roleName });
    this.AppRoles.patchValue({ roleLandingPage: data.roleLandingPage });
    this.AppRoles.patchValue({ status: data.status });
    this.AppRoles.updateValueAndValidity();
    this.operations[data.id] = { ...data };
    this.editIsOpen = true;
    this.alreadyEditIsOpen = true;
  }

  addRow() {
    if (!this.editIsOpen) {
      if (this.AddOneRow == 1) {
        this.AppRoles.reset();
        this.AppRoles.patchValue({ roleID: 0, });
        this.AppRoles.patchValue({ roleName: "" });
        this.AppRoles.patchValue({ roleLandingPage: "" });
        this.AppRoles.patchValue({ status: "" });
        this.AppRoles.updateValueAndValidity();
        var newArray: any = [];
        newArray.push(this.AppRoles.value);
        for (var i = 0; i < this.operations.length; i++) {
          this.operations[i].Serialnumber = i + 2;
          newArray.push(this.operations[i]);
        }
        this.operations = newArray;
        this.docDataTable.initRowEdit(this.operations[0]);
        this.AddOneRow = 2;
        this.alreadyEditIsOpen = true;
      } else {
        if (!this.AppRoles.valid) {
          this.toastr.error('Please fill in all fields')
        }
      }
    } else {
      this.toastr.error('Please complete your edit process');
    }
  }




  onRowEditSave() {
    //console.log("this.AppRoles.valid", this.AppRoles.value);
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;
    if (this.AppRoles.valid) {

      if (this.AddOneRow == 1 && this.AppRoles.touched) {
        this.Api.updateOperations(this.AppRoles.value, 'AppRoles').subscribe((res: any) => {
          if (!res?.isError) {
            this.AppRolesDetails();
            this.toastr.success(res?.message);
          } else {
            this.toastr.error(res?.message);
          }
        });
      }

      if (this.AddOneRow == 2) {
        this.Api.addOperations(this.AppRoles.value, 'AppRoles').subscribe((res: any) => {
          if (!res?.isError) {
            this.toastr.success(res?.message);
          } else {
            this.toastr.error(res?.message);
          }
          this.AddOneRow = 1;
          this.AppRolesDetails();
        });
      }

    } else {
      this.toastr.error('Please fill in all fields')
    }
  }

  onRowEditCancel() {
    this.AppRolesDetails();
    if (this.AddOneRow == 2) {
      this.AddOneRow = 1;
    }
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;
  }


}
