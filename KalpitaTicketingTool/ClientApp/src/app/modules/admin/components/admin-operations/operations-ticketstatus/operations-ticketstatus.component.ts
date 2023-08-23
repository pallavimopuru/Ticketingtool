import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from '../../../service/admin-api.service';
import { AdminOperationApiService } from '../../../service/admin-operation-api';

@Component({
  selector: 'app-operations-ticketstatus',
  templateUrl: './operations-ticketstatus.component.html',
  styleUrls: ['./operations-ticketstatus.component.css']
})
export class OperationsTicketstatusComponent implements OnInit {

  @ViewChild('docDataTable', { static: false }) private docDataTable: any;
  columnHeader: any[] = [];
  operations: any[] = [];
  defaultStatus:any='A'
  statusOptions = [{label :"Active", value: "A"},{label :"Deactive", value: "D"}];
  AddOneRow = 1;

  TicketStatus: FormGroup | any;
  loading: boolean | any;
  editIsOpen: boolean = false;
  alreadyEditIsOpen: boolean = false;

  get form() {
    return this.TicketStatus['controls'];
  }

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder, private Api: AdminOperationApiService,
    private AdminApi: AdminApiService
  ) { }

  ngOnInit(): void {
    this.TicketStatusHeader();
    this.initialForm();
    this.TicketStatusDetails();

  }

  TicketStatusDetails() {
    this.loading = true;
    this.Api.getOperations('TicketStatus').subscribe((res: any) => {
      //console.log("getOperations",res);
      if(res){
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
    this.TicketStatus = this.formBuilder.group({
      'ticketStatusID': new FormControl(0, Validators.nullValidator),
      'ticketStatus': new FormControl('', Validators.required),
      'status': new FormControl('', Validators.nullValidator),
    });
  }


  TicketStatusHeader() {
    this.columnHeader = [
      { field: 'ticketStatusID', header: 'Ticket Status ID' },
      { field: 'ticketStatus', header: 'Ticket Status' },
      { field: 'status', header: 'Status' }
    ];
  }

  EditOpen(){
    this.toastr.error('Please complete your process');
  }


  onRowEditInit(data: any) {
    //console.log("onRowEditInit", data);
    this.TicketStatus.patchValue({ ticketStatusID: data.ticketStatusID, });
    this.TicketStatus.patchValue({ ticketStatus: data.ticketStatus });
    this.TicketStatus.patchValue({ status: data.status });
    this.TicketStatus.updateValueAndValidity();
    this.operations[data.id] = { ...data };
    this.editIsOpen = true;
    this.alreadyEditIsOpen = true;
  }

  onRowEditSave() {
    //console.log("this.TicketStatus.valid", this.TicketStatus.value);
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;

    if (this.TicketStatus.valid) {
      if (this.AddOneRow == 1 && this.TicketStatus.touched) {
        this.Api.updateOperations(this.TicketStatus.value, 'TicketStatus').subscribe((res: any) => {
          if (!res?.isError) {
            this.TicketStatusDetails();
            this.toastr.success(res?.message);
          } else {
            this.toastr.error(res?.message);
          }
        });
      }

      if (this.AddOneRow == 2) {
        this.Api.addOperations(this.TicketStatus.value, 'TicketStatus').subscribe((res: any) => {
          if (!res?.isError) {
            this.TicketStatusDetails();
            this.AddOneRow = 1;
            this.toastr.success(res?.message);
          } else {
            this.TicketStatusDetails();
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
    this.TicketStatusDetails();
    if (this.AddOneRow == 2) {
      this.AddOneRow = 1;
    }
    this.editIsOpen = false;
    this.alreadyEditIsOpen = false;
  }

  addRow() {
    if (!this.editIsOpen) {
    if (this.AddOneRow == 1) {
      this.TicketStatus.reset();
      this.TicketStatus.patchValue({ ticketStatusID: 0, });
      this.TicketStatus.patchValue({ ticketStatus: "" });
      this.TicketStatus.patchValue({ status: "" });
      this.TicketStatus.updateValueAndValidity();
      var newArray: any = [];
      newArray.push(this.TicketStatus.value);
      for (var i = 0; i < this.operations.length; i++) {
        this.operations[i].Serialnumber = i + 2;
        newArray.push(this.operations[i]);
      }
      this.operations = newArray;
      this.docDataTable.initRowEdit(this.operations[0]);
      this.AddOneRow = 2;
      this.alreadyEditIsOpen = true;
    } else {
      if (!this.TicketStatus.valid) {
        this.toastr.error('Please fill in all fields')
      }
    } } else {
      this.toastr.error('Please complete your edit process');
    }
  }

}
