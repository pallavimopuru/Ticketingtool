import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { admin_url } from '../../configs/admin-url-configs';
import { AdminApiService } from '../../service/admin-api.service';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-admin-ticket-history',
  templateUrl: './admin-ticket-history.component.html',
  styleUrls: ['./admin-ticket-history.component.css'],
})
export class AdminTicketHistoryComponent implements OnInit {
  empData: any = [];
  tickets: any = [];
  searchTerm: string = '';
  p = 0;

  // Default calender date................
  date1 = new Date();
  currentYear = this.date1.getUTCFullYear();
  currentMonth = this.date1.getUTCMonth() + 1;
  currentDay = this.date1.getUTCDate();
  TodayDate = '2022-10-12';
  FinalMonth: any;
  FinalDay: any;

  startdate: any;
  enddate: any;
  defaultDate: Date = new Date();
  loading: boolean = false;
  public searchFilterColumn: any;
  public searchFilterText: any;
  public searchFilterObj: any;
  public filterArray: any = [];
  public filterObj: any = {};
  public initialFilter: boolean = true;
  public searchQueryGrid: any;
  public sortColumn: any;
  public sortOrder: any;
  public ascendingOrder: boolean = true;
  public globalTextInput: any = '';
  public isFilterAndGlobal: boolean = false;

  constructor(
    private adminapiservice: AdminApiService,
    private toastr: ToastrService,
    private themeService: ThemeService
  ) {
    this.empData = JSON.parse(sessionStorage.getItem('token')!);
    // console.log(this.empData,"hjhjhhh");
  }

  ngOnInit(): void {
    //This piece of code where Theme is being set should be always present in the First Route Component
    // var adminTheme = JSON.parse(sessionStorage.getItem('userTheme')!);
    var theme = JSON.parse(sessionStorage.getItem('displayTheme')!);
    //console.log("displayTheme",theme)
    // var adminTheme = value?.userTheme;
    this.themeService.setTheme(theme);
    //This piece of code where Theme is being set should be always present in the First Route Component
    this.callFilteringAndSorting(this.searchQueryGrid);
    // this.getUserAllTickets();
    // Default calender date................
    if (this.currentMonth < 10) {
      this.FinalMonth = '0' + this.currentMonth;
    } else {
      this.FinalMonth = this.currentMonth;
    }

    if (this.currentDay < 10) {
      this.FinalDay = '0' + this.currentDay;
    } else {
      this.FinalDay = this.currentDay;
    }
    this.startdate = this.defaultDate;
    this.enddate = this.defaultDate;
    // Default calender date................
  }

  exportValue(start: any, end: any) {
    var startdate = moment(start).format('MM/DD/YYYY');
    var enddate = moment(end).format('MM/DD/YYYY');
    // console.log('start', startdate, 'end', enddate);
    if (startdate != undefined && enddate != undefined) {
      const URL = admin_url.download_excel;
      window.open(
        URL +
          '?UserEmail=' +
          this.empData.username +
          '&startdate=' +
          startdate +
          '&enddate=' +
          enddate
      );
    } else this.toastr.error('Please enter the start and end date');
  }

  // getUserAllTickets() {
  //   // this.loading = true;
  //   this.adminapiservice
  //     .getAllTicket(this.empData.username)
  //     .subscribe((data) => {
  //       this.tickets = data;
  //       // setTimeout(() => {
  //       //   this.loading = false;
  //       // }, 1000);
  //     });
  //   // setTimeout(() => {
  //   //   this.loading = false;
  //   // }, 1000);
  // }
  onSearchChange() {
    this.p = 0;
  }

  public callFilteringAndSorting(e: any) {
    if (this.initialFilter) {
      this.searchQueryGrid = {
        userName: this.empData.name,
        userEmail: this.empData.username,
        searchOption: [],
        sortColumn: '',
        sortOrder: '',
        pageRowCount: 0,
        totalRowCount: 0,
        pageCount: 0,
        offset: 0,
        globalSearchText: '',
        defaultPageSize: 0,
      };
      this.adminapiservice
        .getTicketsAndPostFilteringSortingParams(this.searchQueryGrid)
        .subscribe({
          next: (res: any) => {
            this.tickets = res.tickets;
            this.searchQueryGrid = res.searchQueryGrid;
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      this.initialFilter = false;
    } else {
      this.adminapiservice
        .getTicketsAndPostFilteringSortingParams(e)
        .subscribe({
          next: (res: any) => {
            this.tickets = res.tickets;
            this.searchQueryGrid = res.searchQueryGrid;
          },
          error: (err: any) => {
            console.log(err);
          },
        });
    }
  }

  public getData(filterParams: any, column: any) {
    this.searchFilterText = filterParams;
    let columnName = column.split('\n');
    this.searchFilterColumn = columnName[0].replaceAll(' ', '');

    if (this.searchFilterText != null) {
      this.filterObj = {
        searchFilterCriteria: 'Starts-With',
        searchFilterColumn: this.searchFilterColumn,
        searchFilterText: this.searchFilterText,
      };

      this.filterArray.forEach((item: any) => {
        if (this.searchFilterColumn == item.searchFilterColumn) {
          this.filterArray.splice(this.filterArray.indexOf(item), 1);
        }
      });
      this.filterArray.push(this.filterObj);
    }

    const searchQueryGrid = {
      userName: this.empData.name,
      userEmail: this.empData.username,
      searchOption: this.filterArray,
      sortColumn: '',
      sortOrder: '',
      pageRowCount: 0,
      totalRowCount: 0,
      pageCount: 0,
      offset: 0,
      globalSearchText: this.globalTextInput,
      defaultPageSize: 0,
    };
    this.callFilteringAndSorting(searchQueryGrid);
  }

  public clearFilter(e: any, i: any) {
    this.isFilterAndGlobal = true;

    this.searchFilterText = e;
    let columnName = i.split('\n');
    this.searchFilterColumn = columnName[0].replaceAll(' ', '');
    this.filterArray.forEach((item: any) => {
      if (
        this.searchFilterColumn == item.searchFilterColumn &&
        this.searchFilterText == e
      ) {
        this.filterArray.splice(this.filterArray.indexOf(item), 1);
      }
    });
    const searchQueryGrid = {
      userName: this.empData.name,
      userEmail: this.empData.username,
      searchOption: this.filterArray,
      sortColumn: '',
      sortOrder: '',
      pageRowCount: 0,
      totalRowCount: 0,
      pageCount: 0,
      offset: 0,
      globalSearchText: this.globalTextInput,
      defaultPageSize: 0,
    };
    this.callFilteringAndSorting(searchQueryGrid);
    this.searchQueryGrid.searchOption = searchQueryGrid.searchOption;

    this.callDataGlobally(this.globalTextInput);
  }

  public getSortColumnName(columnName: any) {
    this.sortColumn = columnName.replaceAll(' ', '');
    if (this.ascendingOrder == true) {
      this.sortOrder = 'ASC';
      this.ascendingOrder = !this.ascendingOrder;
      this.searchQueryGrid.offset = 0;
    } else {
      this.sortOrder = 'DESC';
      this.ascendingOrder = !this.ascendingOrder;
      this.searchQueryGrid.offset = 0;
    }

    this.searchQueryGrid.sortColumn = this.sortColumn;
    this.searchQueryGrid.sortOrder = this.sortOrder;

    this.callFilteringAndSorting(this.searchQueryGrid);
  }

  public paginate(event: any) {
    this.searchQueryGrid.offset = event.first;
    this.callFilteringAndSorting(this.searchQueryGrid);
  }

  public callDataGlobally(globalTextInput: any) {
    this.globalTextInput = globalTextInput;

    if (this.isFilterAndGlobal) {
      this.searchQueryGrid.searchOption = this.filterArray;
      this.searchQueryGrid.offset = 0;
    } else {
      this.searchQueryGrid.searchOption = [];
      this.searchQueryGrid.offset = 0;
    }
    setTimeout(() => {
      this.searchQueryGrid.globalSearchText = this.globalTextInput;

      this.callFilteringAndSorting(this.searchQueryGrid);

      this.isFilterAndGlobal = false;
    }, 100);
  }
}
