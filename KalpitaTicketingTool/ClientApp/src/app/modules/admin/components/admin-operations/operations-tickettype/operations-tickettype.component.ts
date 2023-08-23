import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminOperationApiService } from '../../../service/admin-operation-api';

@Component({
  selector: 'app-operations-tickettype',
  templateUrl: './operations-tickettype.component.html',
  styleUrls: ['./operations-tickettype.component.css']
})
export class OperationsTickettypeComponent implements OnInit {


  @ViewChild('docDataTable', { static: false }) private docDataTable: any;
  columnHeader: any[] = [];
  operations: any[] = [];
  loading: boolean | any;
  AddOneRow = 1;

  TicketType: FormGroup | any;
  defaultStatus: any = "A";
  statusOptions = [{label :"Active", value: "A"},{label :"Deactive", value: "D"}];
  editIsOpen: boolean = false;
  alreadyEditIsOpen: boolean = false;
  totalRecords: number | any;


  get form() {
    return this.TicketType['controls'];
  }

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder, private Api: AdminOperationApiService,
  ) { }

  ngOnInit(): void {
    this.TicketTypeHeader();
    this.initialForm();
    this.TicketTypeDetails();

  }

  TicketTypeDetails() {
    this.loading = true;
    this.Api.getOperations('TicketType').subscribe((res: any) => {
      if (res) {
        for (var i = 0; i < res.length; i++) {
          res[i]['Serialnumber'] = i + 1;
        }
        this.operations = res;
        setTimeout(() => {
          this.loading = false;
          this.totalRecords = this.operations.length;
        }, 1000);
      }
    });


  }


  initialForm() {
    this.TicketType = this.formBuilder.group({
      'ticketTypeID': new FormControl(0, Validators.nullValidator),
      'ticketType': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.required),
    });
  }


  TicketTypeHeader() {
    this.columnHeader = [
      { field: 'ticketTypeID', header: 'Ticket Type ID' },
      { field: 'ticketType', header: 'Ticket Type' },
      { field: 'description', header: 'Description' },
      { field: 'status', header: 'Status' }
    ];
  }

  EditOpen() {
    this.toastr.error('Please complete your process');
  }


  onRowEditInit(data: any) {
    // console.log("onRowEditInit", data);
    this.TicketType.patchValue({ ticketTypeID: data.ticketTypeID, });
    this.TicketType.patchValue({ ticketType: data.ticketType });
    this.TicketType.patchValue({ description: data.description });
    this.TicketType.patchValue({ status: data.status });
    this.TicketType.updateValueAndValidity();
    this.operations[data.id] = { ...data };
    this.editIsOpen = true;
    this.alreadyEditIsOpen = true;
  }

  onRowEditSave() {
    // console.log("this.TicketType.valid", this.TicketType);
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;
    if (this.TicketType.valid) {
      if (this.AddOneRow == 1 && this.TicketType.touched) {
        this.Api.updateOperations(this.TicketType.value, 'TicketType').subscribe((res: any) => {
          if (!res?.isError) {
            this.TicketTypeDetails();
            this.toastr.success(res?.message);
          } else {
            this.toastr.error(res?.message);
          }
        });
      }

      if (this.AddOneRow == 2) {
        this.Api.addOperations(this.TicketType.value, 'TicketType').subscribe((res: any) => {
          if (!res?.isError) {
            this.TicketTypeDetails();
            this.AddOneRow = 1;
            this.toastr.success(res?.message);
          } else {
            this.TicketTypeDetails();
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
    if (this.AddOneRow == 2) {
      this.AddOneRow = 1;
    }
    this.TicketTypeDetails();
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;
  }

  addRow() {
    if (!this.editIsOpen) {
      if (this.AddOneRow == 1) {
        this.TicketType.reset();
        this.TicketType.patchValue({ ticketTypeID: 0, });
        this.TicketType.patchValue({ ticketType: "" });
        this.TicketType.patchValue({ description: "" });
        this.TicketType.patchValue({ status: "" });
        this.TicketType.updateValueAndValidity();
        var newArray: any = [];
        newArray.push(this.TicketType.value);
        for (var i = 0; i < this.operations.length; i++) {
          this.operations[i].Serialnumber = i + 2;
          newArray.push(this.operations[i]);
        }
        this.operations = newArray;
        this.docDataTable.initRowEdit(this.operations[0]);
        this.alreadyEditIsOpen = true;
        this.AddOneRow = 2;
      } else {
        if (!this.TicketType.valid) {
          this.toastr.error('Please fill in all fields')
        }
      }
    } else {
      this.toastr.error('Please complete your edit process');
    }

  }

  paginate(data:any){
    //console.log("page",data);


  }
}
