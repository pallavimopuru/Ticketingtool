import {Component, OnInit} from '@angular/core';
import {elementAt} from 'rxjs';
import {AdminApiService} from '../../service/admin-api.service';
import {ThemeService} from '../../service/theme.service';

@Component({selector: 'app-admin-dashboard', templateUrl: './admin-dashboard.component.html', styleUrls: ['./admin-dashboard.component.css']})
export class AdminDashboardComponent implements OnInit {
    FilterRange : any = [];
    filterData : any = [];
    filterSelectBox : any = 1;
    constructor(private adminapiservice : AdminApiService, private themeService : ThemeService) {}
    adminDepartments : any = [];
    departmentSelectBox : any = 1;
    depData : any = [];
    statusCount : any = [];
    operation : any;

    // Pie by Status
    data : any = [];
    labels : any = [];
    counts : any = [];
    backgroundColor : any = [];
    hoverBackgroundColor : any = [];
    doughnutOptions : any;
    doughnutOptionsNoData : any;
    sumofStatusCounts : any;
    displayStatusLegend : any;

    // Column by Priority
    columnPriorityData : any = [];
    priorityDataList : any = [];
    priorityListLabel : any = [];
    sumofPriorityTicketCounts : any;
    displayPriorityLegend : any;
    filterRange : any;
    priotityOptions : any;
    priotityOptionsWithNoData : any;
    ticketStatusCountObject : any = {};
    priorityfilterName : any;
    // boolFilterRange = true;

    // Bar by Ticket Type
    bardata : any = [];
    barlabels : any = [];
    barcounts : any = [];
    barbackgroundColor : any = [];
    barhoverBackgroundColor : any = [];
    horizontalOptions : any;
    horizontalOptionsNoData : any;
    sumofTicketTypeCounts : any;
    displayTicketTypeLegend : any;

    // bar1labels: any = [];
    // bar1counts: any = [];
    // bar1backgroundColor: any = [];
    // bar1hoverBackgroundColor: any = [];

    // Column by Assignee
    columnAssigneeData : any = [];
    assigneeDataList : any = [];
    assineeListLabel : any = [];
    verticalOptions : any;
    verticalOptionsNoData : any;
    sumofAssigneeCounts : any;
    displayAssigneeLegend : any;

    ngOnInit(): void {
        // This piece of code where Theme is being set should be always present in the First Route Component
        // var adminTheme = JSON.parse(sessionStorage.getItem('userTheme')!);
        var theme = JSON.parse(sessionStorage.getItem('displayTheme')!);
        // console.log('displayTheme', theme);
        // var adminTheme = value?.userTheme;
        this.themeService.setTheme(theme);
        // This piece of code where Theme is being set should be always present in the First Route Component

        // console.log('selected', this.selected);

        this.getadminDepartment();
        // this.getDBAllStatusCount();
        // this.getPieData();
        // this.getBarByTicketTypeData();
    }

    getadminDepartment() {
        this.adminapiservice.getAdminDepartments().subscribe((data) => {
            this.adminDepartments = data;
            setTimeout(() => {
                this.departmentSelectBox = '1';
            }, 1500);
            // console.log('Departments', this.adminDepartments);
            this.onOptionsSelected('1');
        });
    }

    onOptionsSelected(event : any) { // this.boolFilterRange = true ;
        var number = event.length == 1 ? event.length : event.target.value;
        this.data = [];
        this.adminDepartments.map((res : any) => {
            if (Number(number) == Number(res.departmentID)) { // console.log('RES', res);
                this.depData = res;
                // console.log('depData',this.depData);

                // console.log(this.depData.departmentID);
                // console.log(this.depData.departmentName);
                this.clearDataList();
                this.getDBAllStatusCount();
                this.getPieData();
                this.getBarByTicketTypeData();
                this.getColumnByAssignee();
                this.getFilterRange();
            }
        });
    }
    clearDataList() {
        this.verticalOptions = [];
        this.columnAssigneeData = [];
        this.assigneeDataList = [];
        this.assineeListLabel = [];
        this.columnPriorityData = [];
        this.priorityDataList = [];
        this.priorityListLabel = [];
        this.priotityOptions = [];
        this.priotityOptionsWithNoData = [];

        this.sumofStatusCounts = 0;
        this.displayStatusLegend = true;

        this.sumofPriorityTicketCounts = 0;
        this.displayPriorityLegend = true;

        this.sumofTicketTypeCounts = 0;
        this.displayTicketTypeLegend = true;

        this.sumofAssigneeCounts = 0;
        this.displayAssigneeLegend = true;
    }
    clearPriorityDatalist() {
        this.priorityDataList = [];
        this.priorityListLabel = [];
        this.priotityOptions = [];
        this.priotityOptionsWithNoData = [];

        this.sumofPriorityTicketCounts = 0;
        this.displayPriorityLegend = true;
    }

    getDBAllStatusCount() {
        this.adminapiservice.get_DBAllStatusCount(this.depData.departmentID, this.depData.departmentName).subscribe((data : any) => {
            this.statusCount = data;
            // console.log(this.statusCount);

            this.statusCount.forEach((data : any) => {
                this.ticketStatusCountObject[data.ticketStatus.replace(' ', '_')] = data.ticketCount;
            });
            // console.log(this.ticketStatusCountObject);
        });
    }

    // Ticket_by_status(doughnut_Graph)
    getPieData() {
        this.adminapiservice.get_PieData(this.depData.departmentID, this.depData.departmentName).subscribe((chartData : any) => {
            this.sumofStatusCounts = 0;
            this.displayStatusLegend = false;
            // console.log('PieData', chartData);
            this.labels = chartData.map((x : {
                ticketStatus: any
            }) => x.ticketStatus);
            // console.log('PieData.ticketStatus', this.labels);
            this.counts = chartData.map((x : {
                ticketCount: any
            }) => x.ticketCount);
            // console.log('PieData.ticketCount', this.counts);
            this.backgroundColor = chartData.map((x : {
                backgroundColor: any
            }) => x.backgroundColor);
            // console.log('PieData.backgroundColor', this.backgroundColor);
            this.hoverBackgroundColor = chartData.map((x : {
                hoverBackgroundColor: any
            }) => x.hoverBackgroundColor);
            let sum: number = this.counts.reduce(function (a: any, b: any) {
                return a + b;
            });
            this.sumofStatusCounts = sum;
            // console.log('piecountsummed:', this.sumofStatusCounts)

            if (this.sumofStatusCounts > 0) {
                this.displayStatusLegend = true;
            } else {
                this.displayStatusLegend = false;
            }

            // console.log('PieData.hoverBackgroundColor', this.hoverBackgroundColor);
            // console.log(
            // 'piecountsummed-displayStatusLegend',
            // this.sumofStatusCounts,
            // this.displayStatusLegend
            // );
        });
        setTimeout(() => {
            this.data = {
                labels: this.labels,

                legend: {
                    pointStyle: 'circle',
                    color: 'white'
                },
                datasets: [
                    {
                        data: this.counts,
                        backgroundColor: this.backgroundColor,
                        hoverBackgroundColor: this.hoverBackgroundColor
                    },
                ]
            };

            // console.log('this.data' ,this.data)
        }, 1500);

        this.doughnutOptions = {
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        // color: '#00bfff',
                        color: 'white'
                    }
                }
            }
        };

        this.doughnutOptionsNoData = {
            plugins: {
                legend: {
                    display: false,
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        // color: '#00bfff',
                        color: 'white'
                    }
                }
            }
        };
    }
    // -----------End-------------//

    // Start Priority Bar Graph
    getColumnByPriority() {
        this.adminapiservice.getColumnByPriority(this.depData.departmentID, this.depData.departmentName, this.priorityfilterName).subscribe((columnPriorityData : any) => { // console.log('columnPriorityData', columnPriorityData);
            this.sumofPriorityTicketCounts = 0;
            this.displayPriorityLegend = false;
            this.priorityListLabel = columnPriorityData.map((x : {
                filterRangeName: any
            }) => x.filterRangeName);
            // console.log('columnPriorityData.priorityListLabel', this.priorityListLabel);

            var priorityList = columnPriorityData.map((x : {
                chartPriorityCounts: any
            }) => x.chartPriorityCounts)[0].map((x : {
                priorityType: any
            }) => x.priorityType);

            // console.log('columnPriorityData.priorityList', priorityList);
            var obj1Label = '';
            var obj1ticketCount: any = [];
            var obj1backgroundColor: any = [];
            var obj1hoverBackgroundColor: any = [];
            this.sumofPriorityTicketCounts = 0;

            priorityList.forEach((priorityData : any) => {
                obj1ticketCount = [];
                obj1backgroundColor = [];
                obj1hoverBackgroundColor = [];

                columnPriorityData.forEach((data : any) => {
                    var individualDataElement1 = data.chartPriorityCounts;
                    obj1Label = priorityData;

                    var individualElementCount = individualDataElement1.filter((x : {
                        priorityType: any
                    }) => x.priorityType == priorityData).map((x : {
                        ticketCount: any
                    }) => x.ticketCount)[0];

                    this.sumofPriorityTicketCounts = this.sumofPriorityTicketCounts + individualElementCount;

                    obj1ticketCount.push(individualElementCount);
                    obj1backgroundColor.push(individualDataElement1.filter((x : {
                        priorityType: any
                    }) => x.priorityType == priorityData).map((x : {
                        backgroundColor: any
                    }) => x.backgroundColor)[0]);
                    obj1hoverBackgroundColor.push(individualDataElement1.filter((x : {
                        priorityType: any
                    }) => x.priorityType == priorityData).map((x : {
                        hoverBackgroundColor: any
                    }) => x.hoverBackgroundColor)[0]);
                });
                var obj1 = {
                    label: obj1Label,
                    data: obj1ticketCount,
                    backgroundColor: obj1backgroundColor,
                    hoverBackgroundColor: obj1hoverBackgroundColor
                };
                this.priorityDataList.push(obj1);
            });
            // console.log('priorityDataList', this.priorityDataList);
            if (this.sumofPriorityTicketCounts > 0) {
                this.displayPriorityLegend = true;
            } else {
                this.displayPriorityLegend = false;
            }
            // console.log(
            // 'sumofPriorityTicketCounts-displayPriorityLegend',
            // this.sumofPriorityTicketCounts,
            // this.displayPriorityLegend
            // );
        });
        setTimeout(() => {
            this.columnPriorityData = {
                labels: this.priorityListLabel,
                legend: {
                    pointStyle: 'circle'
                },
                datasets: this.priorityDataList
            };
            // console.log('columnPriorityData', this.columnPriorityData);
            // this. boolFilterRange = false ;
        }, 1500);
        this.priotityOptions = {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        usePointStyle: true,
                        color: 'white'
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false,
                        color: 'white'
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    display: true,
                    grid: {
                        display: true,
                        color: 'white'
                    },
                    ticks: {
                        color: 'white'
                    }
                }
            }
        };

        this.priotityOptionsWithNoData = {
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: true,
                        color: 'white'
                    }
                }
            },
            scales: {
                x: {
                    display: false,
                    grid: {
                        display: false,
                        color: 'white'
                    },
                    ticks: {
                        display: false
                    }
                },
                y: {
                    display: false,
                    grid: {
                        display: false,
                        color: 'white'
                    },
                    ticks: {
                        display: false
                    }
                }
            }
        };
    }

    getFilterRange() {
        this.adminapiservice.getFilterRange(this.depData.departmentID, this.depData.departmentName, this.filterRange).subscribe((data) => {
            this.FilterRange = data;
            setTimeout(() => {
                this.filterSelectBox = '1';
            }, 1500);
            this.onOptionsSelectedByFilterRange('1');
            // console.log( this.FilterRange)
        });
    }
    onOptionsSelectedByFilterRange(event : any) {
        var number = event.length == 1 ? event.length : event.target.value;
        // console.log(number);
        // this.data = [];
        this.FilterRange.map((res : any) => {
            if (Number(number) == Number(res.filterRangeID)) {
                this.filterData = res;
                // console.log(this.filterData);

                // this.filterRange='2022';
                this.clearPriorityDatalist();
                // this.getColumnByPriority();
            }
        });
        // if(this.boolFilterRange){
        // this.priorityfilterName = "Current Month"
        // }else{
        // this.priorityfilterName = this.filterData.filterRangeName ;
        // }
        this.priorityfilterName = this.filterData.filterRangeName;

        // console.log(this.priorityfilterName);


        this.getColumnByPriority();

    }

    // END: Priority Bar Graph

    // ------By_Ticket_Type(bar_Graph)-----//

    getBarByTicketTypeData() {
        this.adminapiservice.getBarByTicketTypeData(this.depData.departmentID, this.depData.departmentName).subscribe((barData : any) => { // console.log('barData', barData);
            this.sumofTicketTypeCounts = 0;
            this.displayTicketTypeLegend = false;
            this.barlabels = barData.map((x : {
                ticketType: any
            }) => x.ticketType);
            // console.log('barData.ticketStatus', this.labels);

            this.barcounts = barData.map((x : {
                ticketCount: any
            }) => x.ticketCount);
            // console.log('barData.ticketCount', this.counts);

            this.barbackgroundColor = barData.map((x : {
                backgroundColor: any
            }) => x.backgroundColor);
            // console.log('barData.backgroundColor', this.backgroundColor);

            this.barhoverBackgroundColor = barData.map((x : {
                hoverBackgroundColor: any
            }) => x.hoverBackgroundColor);
            // console.log('barData.hoverBackgroundColor', this.hoverBackgroundColor);
            // console.log('barData', barData);
            // console.log('barcounts', this.barcounts);
        });

        // // console.log('PieData.hoverBackgroundColor', this.hoverBackgroundColor);

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

            //       console.log(
            // 'sumofTicketTypeCounts-displayTicketTypeLegend',
            // this.sumofTicketTypeCounts,
            // this.displayTicketTypeLegend
            // );

            this.bardata = {
                labels: this.barlabels,

                datasets: [
                    {
                        data: this.barcounts,
                        backgroundColor: this.barbackgroundColor,
                        hoverBackgroundColor: this.barhoverBackgroundColor
                    },
                ]
            };
            // console.log('this.data', this.data)
        }, 1500);

        this.horizontalOptions = {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: 'white'
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: true,
                        color: 'white'
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    display: true,
                    grid: {
                        display: false,
                        color: 'white'
                    },
                    ticks: {
                        color: 'white'
                    }
                }
            }
        };

        this.horizontalOptionsNoData = {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: 'white'
                    }
                }
            },
            scales: {
                x: {
                    display: false,
                    grid: {
                        display: false,
                        color: 'white'
                    },
                    ticks: {
                        color: 'white',
                        display: false
                    }
                },
                y: {
                    display: false,
                    grid: {
                        display: false,
                        color: 'white'
                    },
                    ticks: {
                        color: 'white',
                        display: false
                    }
                }
            }
        };
    }

    getColumnByAssignee() {
        this.adminapiservice.getColumnByAssignee(this.depData.departmentID, this.depData.departmentName).subscribe((columnAssigneeData : any) => { // console.log('AssigneeData', columnAssigneeData);
            this.sumofAssigneeCounts = 0;
            this.displayAssigneeLegend = false;
            this.assineeListLabel = columnAssigneeData.map((x : {
                assineeName: any
            }) => x.assineeName);
            // console.log('AssigneeData.Assignee', this.assineeListLabel);

            var statusList = columnAssigneeData.map((x : {
                chartAssigneeCounts: any
            }) => x.chartAssigneeCounts)[0].map((x : {
                ticketStatus: any
            }) => x.ticketStatus);

            // console.log('AssigneeData.statusList', statusList);
            var objLabel = '';
            var objticketCount: any = [];
            var objbackgroundColor: any = [];
            var objhoverBackgroundColor: any = [];

            statusList.forEach((statusData : any) => {
                objticketCount = [];
                objbackgroundColor = [];
                objhoverBackgroundColor = [];

                columnAssigneeData.forEach((data : any) => {
                    var individualDataElement = data.chartAssigneeCounts;
                    objLabel = statusData;

                    // var countValue = individualDataElement.filter(
                    // (x: { ticketStatus: any }) => x.ticketStatus == statusData
                    // ).map(
                    // (x: { ticketCount: any }) => x.ticketCount
                    // )
                    // console.log("countValue", countValue)

                    var individualElementAssigneeCount = individualDataElement.filter((x : {
                        ticketStatus: any
                    }) => x.ticketStatus == statusData).map((x : {
                        ticketCount: any
                    }) => x.ticketCount)[0];

                    this.sumofAssigneeCounts = this.sumofAssigneeCounts + individualElementAssigneeCount;

                    objticketCount.push(individualElementAssigneeCount);
                    objbackgroundColor.push(individualDataElement.filter((x : {
                        ticketStatus: any
                    }) => x.ticketStatus == statusData).map((x : {
                        backgroundColor: any
                    }) => x.backgroundColor)[0]);
                    objhoverBackgroundColor.push(individualDataElement.filter((x : {
                        ticketStatus: any
                    }) => x.ticketStatus == statusData).map((x : {
                        hoverBackgroundColor: any
                    }) => x.hoverBackgroundColor)[0]);
                });
                var obj = {
                    label: objLabel,
                    data: objticketCount,
                    backgroundColor: objbackgroundColor,
                    hoverBackgroundColor: objhoverBackgroundColor
                };
                this.assigneeDataList.push(obj);
            });
            // console.log('assigneeDataList', this.assigneeDataList);

            // console.log('piecountsummed:', this.sumofStatusCounts)

            if (this.sumofAssigneeCounts > 0) {
                this.displayAssigneeLegend = true;
            } else {
                this.displayAssigneeLegend = false;
            }

            // console.log('PieData.hoverBackgroundColor', this.hoverBackgroundColor);
            // console.log(
            // 'sumofAssigneeCounts-displayAssigneeLegend',
            // this.sumofAssigneeCounts,
            // this.displayAssigneeLegend
            // );
        });
        setTimeout(() => {
            this.columnAssigneeData = {
                labels: this.assineeListLabel,
                legend: {
                    pointStyle: 'circle',
                    color: 'white'
                },
                datasets: this.assigneeDataList
            };
            // console.log('this.assigneeDataList', this.assigneeDataList);
        }, 1500);
        this.verticalOptions = {
            plugins: {
                legend: {
                    display: true,
                    labels: { // color: '#495057',
                        usePointStyle: true,
                        color: 'white'
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: false,
                        color: 'white'
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    display: true,
                    color: 'white',
                    grid: {
                        display: true,
                        color: 'white'
                    },
                    ticks: {
                        color: 'white'
                    }
                }
            }
        };
        this.verticalOptionsNoData = {
            plugins: {
                legend: {
                    display: false,
                    labels: { // color: '#495057',
                        usePointStyle: true,
                        color: 'white'
                    }
                }
            },
            scales: {
                x: {
                    display: false,
                    grid: {
                        display: false,
                        color: 'white'
                    },
                    ticks: {
                        display: false
                    }
                },
                y: {
                    display: false,
                    grid: {
                        display: false,
                        color: 'white'
                    },
                    ticks: {
                        display: false
                    }
                }
            }
        };
    }
}
