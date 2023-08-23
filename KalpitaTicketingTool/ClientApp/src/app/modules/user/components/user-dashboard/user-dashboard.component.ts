import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { ThemeService } from '../../services/theme.service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  DepartmentId: any;
  DepartmentName: any;
  departmentSelectBox: any = 1;
  empData: any;
  useremail: any;
  UserDepartments: any = [];
  ticketcount: any;
  depData: any;

  //PieChart Declarations
  ticketStatusCountObject: any = {};
  chartCount: any = {};
  labels: any = [];
  counts: any = [];
  backgroundColor: any = [];
  hoverBackgroundColor: any = [];
  doughnutOptionsNoData: any;
  sumofPriorityCounts: any;
  displayPriorityLegend: any;

  //BarChart Declarations
  data: any = [];
  pdata: any = [];
  barlabels: any = [];
  barcounts: any = [];
  barbackgroundColor: any = [];
  barhoverBackgroundColor: any = [];
  horizontalOptions: any;
  horizontalOptionsNoData: any;
  sumofTicketTypeCounts: any;
  displayTicketTypeLegend: any;

  words = [
    {
      displayName: 'Employment of relatives policy',
      FilePath:
        '../../../../../assets/policies/Employment of relatives policy.pdf',
      DepartmentName: 'IT',
    },
    {
      displayName: 'Employment of relatives policy',
      FilePath:
        '../../../../../assets/policies/Employment of relatives policy.pdf',
      DepartmentName: 'IT',
    },
    {
      displayName: 'Employment of relatives policy',
      FilePath: '../../../../../assets/policies/Retirement Policy.pdf',
      DepartmentName: 'HR',
    },
  ];
  filtered: any = [];
  name: any = '';
  doughnutOptions: any = [];

  constructor(
    private userapiservice: UserApiService,
    private cd: ChangeDetectorRef,
    private themeService: ThemeService
  ) {
    this.empData = JSON.parse(sessionStorage.getItem('token')!);
    this.useremail = this.empData.username;
  }

  ngOnInit(): void {
    this.getdepartments();
    // this.getAllTicketStatusCount();
    // this.getPieData();
    // this.getBarData();
    //This piece of code where Theme is being set should be always present in the First Route Component
    var theme = JSON.parse(sessionStorage.getItem('displayTheme')!);
    this.themeService.setTheme(theme);
    //This piece of code where Theme is being set should be always present in the First Route Component
    //This piece of code where Theme is being set should be always present in the First Route Component
  }
  getdepartments() {
    this.userapiservice.getUserDepartments().subscribe((data) => {
      this.UserDepartments = data;
      setTimeout(() => {
        this.departmentSelectBox = '1';
      }, 500);
      //console.log('this.UserDepartments', this.UserDepartments);
      this.onOptionsSelected('1');
    });
    //console.log('departmentSelectBox', this.departmentSelectBox);
  }

  // changeDepartment(_event: any) {
  //   this.DepartmentId = _event.target.value;
  //   console.log(this.DepartmentId);

  // }
  onOptionsSelected(event: any) {
    var number = event.length == 1 ? event.length : event.target.value;
    this.UserDepartments.map((res: any) => {
      if (Number(number) == Number(res.departmentID)) {
        this.depData = res;
        //console.log('depData', this.depData);
        this.name = this.depData.departmentName;

        this.clearDataList();
        this.getAllTicketStatusCount();
        this.getBarData();
        this.getPieData();

        this.cd.detectChanges();
        this.filtered = this.words.filter(
          (x) => x.DepartmentName === res.departmentName
        );

        //console.log(this.filtered);
      }
    });
  }

  clearDataList() {
    this.sumofPriorityCounts = 0;
    this.displayPriorityLegend = true;

    this.sumofTicketTypeCounts = 0;
    this.displayTicketTypeLegend = true;
  }

  getAllTicketStatusCount() {
    this.userapiservice
      .getticketcount(this.depData.departmentID, this.depData.departmentName)
      .subscribe((data) => {
        this.ticketcount = data;
        //console.log(this.ticketcount);
        this.ticketcount.forEach((data: any) => {
          this.ticketStatusCountObject[data.ticketStatus.replace(' ', '_')] =
            data.ticketCount;
          //console.log(this.ticketStatusCountObject);
        });
      });
  }

  getBarData() {
    this.userapiservice

      .get_StatusData(this.depData.departmentID, this.depData.departmentName)

      .subscribe((ticketTypeData: any) => {
        //console.log('PieData', chartData);

        this.barlabels = ticketTypeData.map(
          (x: { ticketType: any }) => x.ticketType
        );

        //console.log('PieData.ticketStatus', this.labels);

        this.barcounts = ticketTypeData.map(
          (x: { ticketCount: any }) => x.ticketCount
        );

        //console.log('PieData.ticketCount', this.counts);

        this.barbackgroundColor = ticketTypeData.map(
          (x: { backgroundColor: any }) => x.backgroundColor
        );

        //console.log('PieData.backgroundColor', this.backgroundColor);

        this.barhoverBackgroundColor = ticketTypeData.map(
          (x: { hoverBackgroundColor: any }) => x.hoverBackgroundColor
        );

        //console.log('PieData.hoverBackgroundColor', this.hoverBackgroundColor);
      });

    setTimeout(() => {
      let sum: number = this.barcounts.reduce(function (a: any, b: any) {
        return a + b;
      });
      this.sumofTicketTypeCounts = sum;

      if (this.sumofTicketTypeCounts > 0) {
        this.displayTicketTypeLegend = true;
      } else {
        this.displayTicketTypeLegend = false;
      }

      this.data = {
        labels: this.barlabels,

        // legend: {
        //   position: 'left',
        // },

        datasets: [
          {
            data: this.barcounts,

            backgroundColor: this.barbackgroundColor,

            hoverBackgroundColor: this.barhoverBackgroundColor,
          },
        ],
      };

      //console.log('this.data', this.data);
    }, 1500);
    this.horizontalOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
          labels: {
            color: 'white',
          },
        },
      },
      scales: {
        x: {
          display: true,
          grid: {
            display: true,
            color: 'white',
          },
          ticks: {
            color: 'white',
          },
        },
        y: {
          display: true,
          grid: {
            display: false,
            color: 'white',
          },
          ticks: {
            color: 'white',
          },
        },
      },
    };

    this.horizontalOptionsNoData = {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
          labels: {
            color: 'white',
          },
        },
      },
      scales: {
        x: {
          display: false,
          grid: {
            display: false,
            color: 'white',
          },
          ticks: {
            color: 'white',
            display: false,
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
            color: 'white',
          },
          ticks: {
            color: 'white',
            display: false,
          },
        },
      },
    };
  }
  getPieData() {
    this.userapiservice

      .get_PriorityData(this.depData.departmentID, this.depData.departmentName)

      .subscribe((priorityChartData: any) => {
        //console.log('PieData', priorityChartData);

        this.labels = priorityChartData.map(
          (x: { priorityType: any }) => x.priorityType
        );

        //console.log('PieData.ticketStatus', this.labels);

        this.counts = priorityChartData.map(
          (x: { ticketCount: any }) => x.ticketCount
        );

        //console.log('PieData.ticketCount', this.counts);

        this.backgroundColor = priorityChartData.map(
          (x: { backgroundColor: any }) => x.backgroundColor
        );

        //console.log('PieData.backgroundColor', this.backgroundColor);

        this.hoverBackgroundColor = priorityChartData.map(
          (x: { hoverBackgroundColor: any }) => x.hoverBackgroundColor
        );

        let sum: number = this.counts.reduce(function (a: any, b: any) {
          return a + b;
        });

        this.sumofPriorityCounts = sum;
        // console.log('piecountsummed:', this.sumofPriorityCounts);

        if (this.sumofPriorityCounts > 0) {
          this.displayPriorityLegend = true;
        } else {
          this.displayPriorityLegend = false;
        }
        // console.log('PieData.hoverBackgroundColor', this.hoverBackgroundColor);
        // console.log(
        //   'piecountsummed-displayPriorityLegend',
        //   this.sumofPriorityCounts,
        //   this.displayPriorityLegend
        // );
        //console.log('PieData.hoverBackgroundColor', this.hoverBackgroundColor);
      });

    setTimeout(() => {
      this.pdata = {
        labels: this.labels,

        legend: {
          position: 'right',
        },

        datasets: [
          {
            data: this.counts,

            backgroundColor: this.backgroundColor,

            hoverBackgroundColor: this.hoverBackgroundColor,
          },
        ],
      };

      // console.log('this.pdata', this.pdata);
    }, 1500);
    this.doughnutOptions = {
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            usePointStyle: true,
            //color: '#00bfff',
            color: 'white',
          },
        },
      },
    };
    this.doughnutOptionsNoData = {
      plugins: {
        legend: {
          display: false,
          position: 'right',
          labels: {
            usePointStyle: true,
            //color: '#00bfff',
            color: 'white',
          },
        },
      },
    };
  }
}
