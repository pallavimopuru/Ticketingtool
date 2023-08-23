import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminOperationApiService } from '../../../service/admin-operation-api';

@Component({
  selector: 'app-operations-category',
  templateUrl: './operations-category.component.html',
  styleUrls: ['./operations-category.component.css']
})
export class OperationsCategoryComponent implements OnInit {


  @ViewChild('docDataTable', { static: false }) private docDataTable: any;
  columnHeader: any[] = [];
  operations: any[] = [];

  AddOneRow = 1;
  defaultStatus:any='A'
  statusOptions = [{label :"Active", value: "A"},{label :"Deactive", value: "D"}];
  Category: FormGroup | any;
  departmentOperations: any[] = [];
  loading: boolean | any;
  editIsOpen: boolean = false;
  alreadyEditIsOpen: boolean = false;

  TicketTypeList: any[] = [];
  departList: any[] = [];

  get form() {
    return this.Category['controls'];
  }

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder, private Api: AdminOperationApiService,
  ) { }

  ngOnInit(): void {
    this.CategoryHeader();
    this.initialForm();
    this.CategoryDetails();

  }

  CategoryDetails() {
    this.loading = true;
    this.Api.getOperations('Category').subscribe((res: any) => {
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

    this.Api.getOperations('Department').subscribe((depart: any) => {
      if (depart) {
        //console.log("depart", depart);
        this.departList = [];
        depart.map((res: any) => {
          if (res.status == "A") {
            this.departList.push(res);
          };
        });
      }
    });
    this.Api.getOperations('TicketType').subscribe((type: any) => {
      if (type) {
        this.TicketTypeList = [];
        type.map((res: any) => {
          if (res.status == "A") {
            this.TicketTypeList.push(res);
          };
        });
      }
    });


  }

  onChange(data: any, field: any) {
    //console.log("data", data?.target?.value, "field", field);
    if (field === 'ticketType') {
      this.TicketTypeList.forEach(res => {
        if (Number(res.ticketTypeID) == Number(data?.target?.value)) {
          this.Category.patchValue({ ticketTypeID: Number(res.ticketTypeID) });
          this.Category.patchValue({ ticketType: res.ticketType, });
          this.Category.get('ticketTypeID').updateValueAndValidity();
          this.Category.get('ticketType').updateValueAndValidity();
        }
      })
    } else if (field === 'departmentName') {
      this.departList.forEach(res => {
        if (Number(res.departmentID) == Number(data?.target?.value)) {
          this.Category.patchValue({ departmentID: Number(res.departmentID) });
          this.Category.patchValue({ departmentName: res.departmentName, });
          this.Category.get('departmentID').updateValueAndValidity();
          this.Category.get('departmentName').updateValueAndValidity();
        }
      })
    }

  }

  initialForm() {
    this.Category = this.formBuilder.group({
      'categoryID': new FormControl('', Validators.nullValidator),
      'categoryName': new FormControl('', Validators.required),
      'ticketTypeID': new FormControl('', Validators.required),
      'ticketType': new FormControl('', Validators.nullValidator),
      'departmentID': new FormControl('', Validators.required),
      'departmentName': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.nullValidator),
    });
  }

  EditOpen() {
    this.toastr.error('Please complete your process');
  }

  CategoryHeader() {
    this.columnHeader = [
      { field: 'categoryID', header: 'Category ID',width: '100px'},
      { field: 'categoryName', header: 'Category Name',width: '300px' },
      { field: 'departmentName', header: 'Department Name',width: '300px' },
      { field: 'ticketType', header: 'Ticket Type',width: '300px' },
      { field: 'status', header: 'Status',width: '150px' }
    ];
  }


  onRowEditInit(data: any) {
    //console.log("onRowEditInit", data);
    if (data.ticketType) {
      this.TicketTypeList.forEach(res => {
        if (data.ticketType == res.ticketType) {
          this.Category.patchValue({ ticketTypeID: res.ticketTypeID });
          this.Category.patchValue({ ticketType: res.ticketType, });
          this.Category.get('ticketTypeID').updateValueAndValidity();
          this.Category.get('ticketType').updateValueAndValidity();
          //console.log("ticketTypeID", this.Category.get('ticketTypeID').value);
          //console.log("ticketType", this.Category.get('ticketType').value);
        }
      })
    }

    if (data.departmentName) {
      this.departList.forEach(res => {
        if (data.departmentName == res.departmentName) {
          this.Category.patchValue({ departmentID: res.departmentID });
          this.Category.patchValue({ departmentName: res.departmentName, });
          this.Category.get('departmentID').updateValueAndValidity();
          this.Category.get('departmentName').updateValueAndValidity();
          //console.log("departmentID", this.Category.get('departmentID').value);
          //console.log("departmentName", this.Category.get('departmentName').value);
        }
      })
    };
    this.Category.patchValue({ categoryID: data.categoryID });
    this.Category.patchValue({ categoryName: data.categoryName });
    this.Category.patchValue({ status: data.status });
    this.Category.get('categoryName').updateValueAndValidity();
    this.Category.get('ticketTypeID').updateValueAndValidity();
    this.Category.get('ticketType').updateValueAndValidity();
    this.Category.get('departmentID').updateValueAndValidity();
    this.Category.get('departmentName').updateValueAndValidity();
    this.Category.get('status').updateValueAndValidity();
    this.operations[data.id] = { ...data };
    this.editIsOpen = true;
    this.alreadyEditIsOpen = true;
  }

  addRow() {
    if (!this.editIsOpen) {
      if (this.AddOneRow == 1) {
        this.Category.reset();
        this.Category.patchValue({ categoryID: this.operations.length - 1, });
        this.Category.patchValue({ categoryName: "" });
        this.Category.patchValue({ ticketTypeID: "" });
        this.Category.patchValue({ ticketType: "" });
        this.Category.patchValue({ departmentID: "" });
        this.Category.patchValue({ departmentName: "" });
        this.Category.patchValue({ status: "" });
        this.Category.updateValueAndValidity();
        var newArray: any = [];
        newArray.push(this.Category.value);
        for (var i = 0; i < this.operations.length; i++) {
          this.operations[i].Serialnumber = i + 2;
          newArray.push(this.operations[i]);
        }
        this.operations = newArray;
        this.docDataTable.initRowEdit(this.operations[0]);
        this.AddOneRow = 2;
        this.alreadyEditIsOpen = true;
      } else {
        if (!this.Category.valid) {
          this.toastr.error('Please fill in all fields')
        }
      }
    } else {
      this.toastr.error('Please complete your edit process');
    }
  }

  onRowEditSave() {
    //console.log("this.Category.valid", this.Category.value);
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;

    if (this.Category.valid) {

      if (this.AddOneRow == 1 && this.Category.touched) {
        this.Api.updateOperations(this.Category.value, 'Category').subscribe((res: any) => {
          if (!res?.isError) {
            this.CategoryDetails();
            this.toastr.success(res?.message);
          } else {
            this.CategoryDetails();
            this.toastr.error(res?.message);
          }
        });
      }

      if (this.AddOneRow == 2) {
        this.Api.addOperations(this.Category.value, 'Category').subscribe((res: any) => {
          if (!res?.isError) {
            this.CategoryDetails();
            this.AddOneRow = 1;
            this.toastr.success(res?.message);
          } else {
            this.AddOneRow = 1;
            this.CategoryDetails();
            this.toastr.error(res?.message);
          }
        });
      }

    } else {
      this.toastr.error('Please fill in all fields')
    }
  }

  onRowEditCancel() {
    this.CategoryDetails();
    if (this.AddOneRow == 2) {
      this.AddOneRow = 1;
    }
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;
  }


}
