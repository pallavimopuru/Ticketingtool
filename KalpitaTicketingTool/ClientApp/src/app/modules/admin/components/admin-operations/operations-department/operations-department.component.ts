import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from '../../../service/admin-api.service';
import { AdminOperationApiService } from '../../../service/admin-operation-api';

@Component({
  selector: 'app-operations-department',
  templateUrl: './operations-department.component.html',
  styleUrls: ['./operations-department.component.css']
})
export class OperationsDepartmentComponent implements OnInit {

  @ViewChild('docDataTable', { static: false }) private docDataTable: any;
  columnHeader: any;
  operations: any[] = [];
  defaultStatus:any='A'
  statusOptions = [{label :"Active", value: "A"},{label :"Deactive", value: "D"}];
  AddOneRow = 1;
  loading: boolean | any;
  DepartmentForm: FormGroup | any;
  distributionList: any;

  get form() {
    return this.DepartmentForm['controls'];
  }
  editIsOpen: boolean = false;
  alreadyEditIsOpen: boolean = false;
  userList: any[] = [];

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder, private Api: AdminOperationApiService,
    private AdminApi: AdminApiService
  ) { }

  ngOnInit(): void {
    this.DepartmentHeader();
    this.initialForm();
    this.DepartmentDetails();

    //console.log("form", this.form.DepartmentType);

  }

  DepartmentDetails() {
    this.loading = true;
    this.Api.getOperations('Department').subscribe((res: any) => {
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

    this.Api.getOperations('DistributionList').subscribe((res: any) => {
      //console.log("DistributionList", res);
      this.distributionList = res;
    });

  }


  initialForm() {
    this.DepartmentForm = this.formBuilder.group({
      'departmentID': new FormControl('', Validators.nullValidator),
      'departmentName': new FormControl('', Validators.required),
      'departmentDescription': new FormControl('', Validators.required),
      'distributionListID': new FormControl('', Validators.required),
      'distributionListEmail': new FormControl('', Validators.required),
      'defaultAssigneeEmail': new FormControl('', Validators.required),
      'userID': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.nullValidator),
    });
  }

  EditOpen() {
    this.toastr.error('Please complete your process');
  }

  DepartmentHeader() {
    this.columnHeader = [
      { field: 'departmentID', header: 'Department ID', width : '150px' },
      { field: 'departmentName', header: 'Name' , width : '150px' },
      { field: 'departmentDescription', header: 'Description' , width : '300px' },
      { field: 'distributionListEmail', header: 'Distribution List' , width : '300px' },
      { field: 'defaultAssigneeEmail', header: 'Default Assignee' , width : '350px' },
      { field: 'status', header: 'Status' , width : '200px' }
    ];
  }

  onChange(data: any, field: any) {
    //console.log("data", data?.target?.value, "field", field);
    if (field === 'userName') {
      this.userList.forEach(res => {
        if (Number(res.userID) == Number(data?.target?.value)) {
          this.DepartmentForm.patchValue({ userID: res.userID });
          this.DepartmentForm.patchValue({ defaultAssigneeEmail: res.userEmail });
          this.DepartmentForm.get('defaultAssigneeEmail').updateValueAndValidity();
        }
      })
    }
    if (field === 'distributionList') {
      this.distributionList.forEach((res: any) => {
        if (Number(res.distributionListID) == Number(data?.target?.value)) {
          this.DepartmentForm.patchValue({ distributionListEmail: res.distributionListEmail, });
          this.DepartmentForm.get('distributionListEmail').updateValueAndValidity();
        }
      });
    }
  }


  onRowEditInit(data: any) {
 //console.log("data",data);

 this.userList.forEach(res => {
  if (res.userEmail == data.defaultAssigneeEmail) {
    this.DepartmentForm.patchValue({ userID: res.userID });
    this.DepartmentForm.patchValue({ defaultAssigneeEmail: res.userEmail });
    this.DepartmentForm.get('userID').updateValueAndValidity();
    this.DepartmentForm.get('defaultAssigneeEmail').updateValueAndValidity();
  }
});
this.distributionList.forEach((res: any) => {
  if (Number(res.distributionListID) == Number(data.distributionListID)) {
    this.DepartmentForm.patchValue({ distributionListID: Number(res.distributionListID) });
    this.DepartmentForm.get('distributionListID').updateValueAndValidity();
  }
});
 this.DepartmentForm.patchValue({ defaultAssigneeEmail: data.defaultAssigneeEmail, });
    this.DepartmentForm.patchValue({ distributionListEmail: data.distributionListEmail });
    this.DepartmentForm.patchValue({ departmentID: data.departmentID, });
    this.DepartmentForm.patchValue({ departmentName: data.departmentName });
    this.DepartmentForm.patchValue({ departmentDescription: data.departmentDescription });
    this.DepartmentForm.patchValue({ status: data.status });
    this.DepartmentForm.get('departmentID').updateValueAndValidity();
    this.DepartmentForm.get('departmentName').updateValueAndValidity();
    this.DepartmentForm.get('departmentDescription').updateValueAndValidity();
    this.DepartmentForm.get('status').updateValueAndValidity();
    this.DepartmentForm.updateValueAndValidity();
    this.operations[data.id] = { ...data };
    this.editIsOpen = true;
    this.alreadyEditIsOpen = true;
  }

  onRowEditSave() {
    //console.log("this.DepartmentForm.valid", this.DepartmentForm.value);

    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;

    if (this.DepartmentForm.valid) {

      if (this.AddOneRow == 1 && this.DepartmentForm.touched) {
        this.Api.updateOperations(this.DepartmentForm.value, 'Department').subscribe((res: any) => {
          if (!res?.isError) {
            this.DepartmentDetails();
            this.toastr.success(res?.message);
          } else {
            this.toastr.error(res?.message);
          }
        });
      }

      if (this.AddOneRow == 2) {
        this.Api.addOperations(this.DepartmentForm.value, 'Department').subscribe((res: any) => {
          if (!res?.isError) {
            this.DepartmentDetails();
            this.AddOneRow = 1;
            this.toastr.success(res?.message);
          } else {
            this.DepartmentDetails();
            this.AddOneRow = 1;
            this.toastr.error(res?.message);
          }
        });
      }

    } else {
      this.toastr.error('Please fill in all fields')
    }
  }

  onRowEditCancel() {
    this.DepartmentDetails();
    if (this.AddOneRow == 2) {
      this.AddOneRow = 1;
    }

    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;
  }

  addRow() {
    if (!this.editIsOpen) {
      if (this.AddOneRow == 1) {
        this.DepartmentForm.reset();
        this.DepartmentForm.patchValue({ departmentID: this.operations.length - 1 });
        this.DepartmentForm.patchValue({ departmentName: "" });
        this.DepartmentForm.patchValue({ departmentDescription: "" });
        this.DepartmentForm.patchValue({ userName: "" });
        this.DepartmentForm.patchValue({ userID: "" });
        this.DepartmentForm.patchValue({ status: "" });
        this.DepartmentForm.patchValue({ distributionListID: "" });
        this.DepartmentForm.updateValueAndValidity();


        var newArray: any = [];
        newArray.push(this.DepartmentForm.value);
        for (var i = 0; i < this.operations.length; i++) {
          this.operations[i].Serialnumber = i + 2;
          newArray.push(this.operations[i]);
        }
        //console.log('newArray', newArray);

        this.operations = newArray;
        this.docDataTable.initRowEdit(this.operations[0]);
        this.AddOneRow = 2;
        this.alreadyEditIsOpen = true;
      } else {
        if (!this.DepartmentForm.valid) {
          this.toastr.error('Please fill in all fields')
        }
      }
    } else {
      this.toastr.error('Please complete your edit process');
    }
  }
}
