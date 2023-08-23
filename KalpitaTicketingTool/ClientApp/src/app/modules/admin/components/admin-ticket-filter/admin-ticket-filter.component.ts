import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import * as EventEmitter from 'events';
import { AdminApiService } from '../../service/admin-api.service';

@Component({
  selector: 'app-admin-ticket-filter',
  templateUrl: './admin-ticket-filter.component.html',
  styleUrls: ['./admin-ticket-filter.component.css']
})
export class AdminTicketFilterComponent implements OnInit {

  @Output() filterData = new EventEmitter<{}>();
  @Output() clearFilterEmitter = new EventEmitter<string>();
  constructor(private _apiService : AdminApiService) { }

  ngOnInit(): void {
  }
  public passFilterParams(filterParam : any){
    // console.log(filterParam);
    // this._apiService.getData().subscribe((data:any)=>{
    //   console.log(data);
    //   this.filteredData = data;
    //   this.filterDataObject = {
    //     filterParam : filterParam,
    //     filteredData : this.filteredData
    //   }
      this.filterData.emit(filterParam);
    // })
  }

  public clearFilter(value : any){
    this.clearFilterEmitter.emit(value);
    // console.log(value);
    
  }


}
