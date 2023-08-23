import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminOperationApiService } from '../../../service/admin-operation-api';

@Component({
  selector: 'app-operations-priority',
  templateUrl: './operations-priority.component.html',
  styleUrls: ['./operations-priority.component.css']
})
export class OperationsPriorityComponent implements OnInit {

  @ViewChild('docDataTable', { static: false }) private docDataTable: any;
  columnHeader: any[] = [];
  operations: any[] = [];
  defaultStatus:any='A'
  statusOptions = [{label :"Active", value: "A"},{label :"Deactive", value: "D"}];
  AddOneRow = 1;
  loading: boolean | any;
  priorityForm: FormGroup | any;
  editIsOpen: boolean = false;
  alreadyEditIsOpen: boolean = false;
  get form() {
    return this.priorityForm['controls'];
  }

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private Api: AdminOperationApiService) { }

  ngOnInit(): void {
    this.priorityHeader();
    this.initialForm();
    this.priorityDetails();

    //console.log("form", this.form.PriorityType);

  }
  


  priorityDetails() {
    this.loading = true;
    this.Api.getOperations('Priority').subscribe((res: any) => {
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

  initialForm() {
    this.priorityForm = this.formBuilder.group({
      'priorityID': new FormControl(0, Validators.nullValidator),
      'priorityType': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.nullValidator),
    });
  }


  priorityHeader() {
    this.columnHeader = [
      { field: 'priorityID', header: 'Priority ID', width : '150px' },
      { field: 'priorityType', header: 'PriorityType', width : '250px' },
      { field: 'description', header: 'Description',width : '500px' },
      { field: 'status', header: 'Status',width : '200px' }
    ];
  }

  EditOpen(){
    this.toastr.error('Please complete your process');
  }

  onRowEditInit(data: any) {
    this.priorityForm.patchValue({ priorityID: data.priorityID, });
    this.priorityForm.patchValue({ priorityType: data.priorityType });
    this.priorityForm.patchValue({ description: data.description });
    this.priorityForm.patchValue({ status: data.status });
    this.priorityForm.updateValueAndValidity();
    this.operations[data.id] = { ...data };
    this.editIsOpen = true;
    this.alreadyEditIsOpen = true;
  }

  addRow() {
    if (!this.editIsOpen) {
      if (this.AddOneRow == 1) {
        this.priorityForm.reset();
        this.priorityForm.patchValue({ priorityID: 0 });
        this.priorityForm.patchValue({ priorityType: "" });
        this.priorityForm.patchValue({ description: "" });
        this.priorityForm.patchValue({ status: "" });
        this.priorityForm.updateValueAndValidity();
        var newArray: any = [];
        newArray.push(this.priorityForm.value);
        for (var i = 0; i < this.operations.length; i++) {
          this.operations[i].Serialnumber = i + 2;
          newArray.push(this.operations[i]);
        }
        this.operations = newArray;
        this.docDataTable.initRowEdit(this.operations[0]);
        this.AddOneRow = 2;
        this.alreadyEditIsOpen = true;
      } else {
        if (!this.priorityForm.valid) {
          this.toastr.error('Please fill in all fields')
        }
      }
    } else {
      this.toastr.error('Please complete your edit process');
    }
  }

  onRowEditSave() {

    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;

    if (this.priorityForm.valid) {
      if (this.AddOneRow == 1 && this.priorityForm.touched) {
        this.Api.updateOperations(this.priorityForm.value, 'Priority').subscribe((res: any) => {
          if (!res?.isError) {
            this.priorityDetails();
            this.toastr.success(res?.message);
          } else {
            this.toastr.error(res?.message);
          }
        });
      }

      if (this.AddOneRow == 2) {
        this.Api.addOperations(this.priorityForm.value, 'Priority').subscribe((res: any) => {
          if (!res?.isError) {
            this.priorityDetails();
            this.AddOneRow = 1;
            this.toastr.success(res?.message);
          } else {
            this.AddOneRow = 1;
            this.priorityDetails();
            this.toastr.error(res?.message);
          }
        });
      }

    } else {
      this.toastr.error('Please fill in all fields')
    }
  }

  onRowEditCancel() {
    this.priorityDetails();
    if (this.AddOneRow == 2) {
      this.AddOneRow = 1;
    }
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;
  }
}
