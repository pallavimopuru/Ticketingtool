import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminOperationApiService } from '../../../service/admin-operation-api';

@Component({
  selector: 'app-operations-distribution',
  templateUrl: './operations-distribution.component.html',
  styleUrls: ['./operations-distribution.component.css'],
})
export class OperationsDistributionComponent implements OnInit {
  @ViewChild('docDataTable', { static: false }) private docDataTable: any;
  columnHeader: any[] = [];
  operations: any[] = [];
  defaultStatus: any = 'A';
  statusOptions = [
    { label: 'Active', value: 'A' },
    { label: 'Deactive', value: 'D' },
  ];
  AddOneRow = 1;
  loading: boolean | any;
  DistributionForm: FormGroup | any;
  editIsOpen: boolean = false;
  alreadyEditIsOpen: boolean = false;
  get form() {
    return this.DistributionForm['controls'];
  }

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private Api: AdminOperationApiService
  ) {}

  ngOnInit(): void {
    this.DistributionHeader();
    this.initialForm();
    this.DistributionDetails();

    //console.log("form", this.form.DistributionType);
  }

  DistributionDetails() {
    this.loading = true;
    this.Api.getOperations('DistributionList').subscribe((res: any) => {
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
    this.loading = false;
  }

  initialForm() {
    this.DistributionForm = this.formBuilder.group({
      distributionListID: new FormControl(0, Validators.nullValidator),
      distributionListEmail: new FormControl('', [
        Validators.required,

        Validators.email,

        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      distributionListDescription: new FormControl('', Validators.required),
      status: new FormControl('', Validators.nullValidator),
    });
  }

  DistributionHeader() {
    this.columnHeader = [
      { field: 'distributionListID', header: 'Distribution ID',width: '150px'},
      { field: 'distributionListEmail', header: 'Distribution Email',width: '400px'},
      { field: 'distributionListDescription', header: 'Description',width: '350px'},
      { field: 'status', header: 'Status',width: '200px'},
    ];
  }

  EditOpen() {
    this.toastr.error('Please complete your process');
  }

  onRowEditInit(data: any) {
    this.DistributionForm.patchValue({
      distributionListID: data.distributionListID,
    });
    this.DistributionForm.patchValue({
      distributionListEmail: data.distributionListEmail,
    });
    this.DistributionForm.patchValue({
      distributionListDescription: data.distributionListDescription,
    });
    this.DistributionForm.patchValue({ status: data.status });
    this.DistributionForm.updateValueAndValidity();
    this.operations[data.id] = { ...data };
    this.editIsOpen = true;
    this.alreadyEditIsOpen = true;
  }

  addRow() {
    if (!this.editIsOpen) {
      if (this.AddOneRow == 1) {
        this.DistributionForm.reset();
        this.DistributionForm.patchValue({ distributionListID: 0 });
        this.DistributionForm.patchValue({ distributionListEmail: '' });
        this.DistributionForm.patchValue({ distributionListDescription: '' });
        this.DistributionForm.patchValue({ status: '' });
        this.DistributionForm.updateValueAndValidity();
        var newArray: any = [];
        newArray.push(this.DistributionForm.value);
        for (var i = 0; i < this.operations.length; i++) {
          this.operations[i].Serialnumber = i + 2;
          newArray.push(this.operations[i]);
        }
        this.operations = newArray;
        this.docDataTable.initRowEdit(this.operations[0]);
        this.AddOneRow = 2;
        this.alreadyEditIsOpen = true;
      } else {
        if (!this.DistributionForm.valid) {
          if (this.DistributionForm.value.distributionListEmail != '')
            this.toastr.error('Please provide valid email address');
          else this.toastr.error('Please fill in all fields');
        }
      }
    } else {
      this.toastr.error('Please complete your edit process');
    }
  }

  onRowEditSave() {
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;
    if (this.DistributionForm.valid) {
      if (this.AddOneRow == 1 && this.DistributionForm.touched) {
        this.Api.updateOperations(
          this.DistributionForm.value,
          'DistributionList'
        ).subscribe((res: any) => {
          if (!res?.isError) {
            this.DistributionDetails();
            this.toastr.success(res?.message);
          } else {
            this.toastr.error(res?.message);
          }
        });
      }

      if (this.AddOneRow == 2) {
        this.Api.addOperations(
          this.DistributionForm.value,
          'DistributionList'
        ).subscribe((res: any) => {
          if (!res?.isError) {
            this.DistributionDetails();
            this.AddOneRow = 1;
            this.toastr.success(res?.message);
          } else {
            this.AddOneRow = 1;
            this.DistributionDetails();
            this.toastr.error(res?.message);
          }
        });
      }
    } else {
      if (this.DistributionForm.value.distributionListEmail != '')
        this.toastr.error('Please provide valid email address');
      else this.toastr.error('Please fill in all fields');
    }
  }

  onRowEditCancel() {
    this.DistributionDetails();
    if (this.AddOneRow == 2) {
      this.AddOneRow = 1;
    }
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;
  }
}
