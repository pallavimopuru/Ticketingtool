import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-ticket-filter',
  templateUrl: './user-ticket-filter.component.html',
  styleUrls: ['./user-ticket-filter.component.css']
})
export class UserTicketFilterComponent implements OnInit {

  @Output() filterData = new EventEmitter<{}>();
  @Output() clearFilterEmitter = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  public passFilterParams(filterParam : any){
      this.filterData.emit(filterParam);
  }

  public clearFilter(value : any){
    this.clearFilterEmitter.emit(value);
  }
}
