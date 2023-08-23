import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    RequiredValidator,
    Validators
} from '@angular/forms';
import {UserApiService} from '../../services/user-api.service';
import {ToastrService} from 'ngx-toastr';
import {ThemeService} from '../../services/theme.service';


@Component({selector: 'app-user-create-ticket', templateUrl: './user-create-ticket.component.html', styleUrls: ['./user-create-ticket.component.css']})
export class UserCreateTicketComponent implements OnInit {
    empData : any = [];
    tickets : any;
    ticketsTypes : any = [];
    departments : any = [];
    priorities : any = [];
    categories : any = [];
    TicketId : any;
    DepartmentId : any;
    EmployeeList : any = [];
    isSelf : boolean = false;
    selectedradioValue : any;
    file : any = null;
    desc = '';
    ticket : FormGroup | any;
    public searchInput : String = '';
    public searchResult : Array < any > = [];
    public toggle : Boolean = false;
    public selectedInput : any = {};
    onlyImage : boolean = false;
    filePath : FormData | any;


    constructor(private userapiservice : UserApiService, private toastr : ToastrService, private formBuilder : FormBuilder, private themeService : ThemeService) {
        this.empData = JSON.parse(sessionStorage.getItem('token')!);
        // console.log(this.empData.username);
        this.initform();
    }

    ngOnInit(): void { // This piece of code where Theme is being set should be always present in the First Route Component
        var theme = JSON.parse(sessionStorage.getItem('displayTheme')!);
        this.themeService.setTheme(theme);
        // This piece of code where Theme is being set should be always present in the First Route Component

        this.initform();
        this.getTickets();
        this.getTicketsTypes();
        this.getdepartments();
        this.getUserTicketPriorities();
        this.getEmployeeList()
    }

    getTickets() {
        this.userapiservice.getUserTicket(this.empData.username).subscribe((data) => {
            this.tickets = data;
            // console.log(' this.tickets', this.tickets);

        });
    }

    getTicketsTypes() {
        this.userapiservice.getUserTicketTypes().subscribe((data) => {
            this.ticketsTypes = data;
        });
    }
    getdepartments() {
        this.userapiservice.getUserDepartments().subscribe((data) => {
            this.departments = data;
        });
    }


    getTicketCategories() {
        if (this.DepartmentId && this.TicketId) {
            this.userapiservice.getUserCategories(this.TicketId, this.DepartmentId).subscribe((data) => {
                this.categories = data;
                // console.log(this.categories);
            });
        }
        this.ticket.get('CategoryID').patchValue('');
        this.ticket.get('CategoryID').setValidators([Validators.required])
        this.ticket.get('CategoryID').updateValueAndValidity();
    }

    changeTicketType(_event : any) {
        this.TicketId = _event.target.value;
        // console.log(this.TicketId)
        this.getTicketCategories()
    }

    changeDepartment(_event : any) {
        this.DepartmentId = _event.target.value;
        // console.log(this.DepartmentId)
        this.getTicketCategories()
    }

    getUserTicketPriorities() {
        this.userapiservice.getUserTicketPriority().subscribe((data) => {
            this.priorities = data;
            // console.log(this.priorities);
        });
    }

    getEmployeeList() {
        this.userapiservice.getEmployeeList().subscribe((data : any) => {
            this.EmployeeList = data.filter((user : {
                userEmail: any;
            }) => user.userEmail != this.empData.username);
            // console.log(this.EmployeeList)
        })
    }

    radioSelected(event : any) {
        this.selectedradioValue = event.target.value;
        if (this.selectedradioValue == 'self') {
            this.isSelf = true;
            this.ticket.get('CreatedForEmail').reset();
            this.ticket.get('CreatedForEmail').setValidators([Validators.nullValidator])
            this.ticket.get('CreatedForEmail').updateValueAndValidity();
        } else if (this.selectedradioValue == 'others') {
            this.isSelf = false;
            this.ticket.get('CreatedForEmail').setValidators([Validators.required])
            this.ticket.get('CreatedForEmail').updateValueAndValidity();
        }

    }

    get TicketTypeID() {
        return this.ticket.get("TicketTypeID");
    }
    get DepartmentID() {
        return this.ticket.get("DepartmentID");
    }
    get CategoryID() {
        return this.ticket.get("CategoryID");
    }
    get self() {
        return this.ticket.get("self");
    }
    get others() {
        return this.ticket.get("others");
    }
    get CreatedForEmail() {
        return this.ticket.get("CreatedForEmail");
    }
    get TicketTitle() {
        return this.ticket.get("TicketTitle");
    }
    get PriorityID() {
        return this.ticket.get("PriorityID");
    }

    get TicketComment() {
        return this.ticket.get("TicketComment");
    }

    get ImageAttachments() {
        return this.ticket.get("ImageAttachments");
    }

    initform() {
        this.isSelf = true;
        this.ticket = this.formBuilder.group({
            TicketTypeID: [
                "",
                [Validators.required]
            ],
            DepartmentID: [
                "",
                [Validators.required]
            ],
            CategoryID: [
                "",
                [Validators.required]
            ],
            CreatedForEmail: [
                "",
                [Validators.nullValidator]
            ],
            CreatedForName: [
                "",
                [Validators.nullValidator]
            ],
            CreatedByName: [
                this.empData.name,
                [Validators.nullValidator]
            ],
            CreatedByEmail: [
                this.empData.username,
                [Validators.nullValidator]
            ],
            self: [
                "self",
                [Validators.nullValidator]
            ],
            others: [
                "",
                [Validators.nullValidator]
            ],
            othersIp: [
                "",
                [Validators.nullValidator]
            ],
            TicketTitle: [
                "",
                [Validators.required]
            ],
            PriorityID: [
                "",
                [Validators.required]
            ],
            TicketComment: [
                "",
                [Validators.required]
            ],
            ImageAttachments: [
                "",
                [Validators.nullValidator]
            ]
        });
    }

    // public userExists(data: any) {
    // if(data == ""){
    //     return true;
    // }
    // else{
    //     return this.EmployeeList.some((item :any) =>{
    //       return item.userEmail === data;
    //     });
    // }
    // }

    public userExists(data : any) {
        if (data == "") {
            return false;
        } else {
            return this.EmployeeList.some((item : any) => {
                return item.userEmail === data;
            });
        }
    }


    ticketdata(data : any) {

        var log = true;
        if (this.isSelf) {
            log = true;
        } else {
            log = this.userExists(data.CreatedForEmail)
        }
        // console.log("Data_LogValue", data, log);

        // console.log(this.ticket.valid && log);
        if (this.ticket.valid && log) {
            const formdata = new FormData();
            formdata.append("TicketTypeID", this.ticket.value.TicketTypeID);
            formdata.append("DepartmentID", this.ticket.value.DepartmentID);
            formdata.append("CategoryID", this.ticket.value.CategoryID);
            formdata.append("CreatedForEmail", this.ticket.value.CreatedForEmail);
            formdata.append("CreatedForName", this.ticket.value.CreatedForName);
            formdata.append("TicketTitle", this.ticket.value.TicketTitle);
            formdata.append("PriorityID", this.ticket.value.PriorityID);
            formdata.append("CreatedByName", this.ticket.value.CreatedByName);
            formdata.append("CreatedByEmail", this.ticket.value.CreatedByEmail);
            formdata.append("TicketComment", this.ticket.value.TicketComment);
            if (this.file) {
                for (let i = 0; i < this.file ?. length; i++) {
                    formdata.append("ImageAttachments", this.file[i]);
                }
            }

            this.userapiservice.createTicket(formdata).subscribe({
                next: (formdata : any) => {
                    this.toastr.success('Ticket Created')
                    this.ticket.reset();
                    this.getTickets();
                    this.initform();
                },
                error: () => {
                    this.toastr.error('Failed to create ticket')
                }
            })
        } else {
            if (! log) {
                this.toastr.error('Please enter the required fields / proper raised for email');
            } else {
                this.toastr.error('Please enter the required fields');
            }

        }


    }
    onChange(event : any) {
        this.file = event.target.files;
        // console.log(this.file)
        const formData: any = [];
        if (this.file.length > 0) {
            for (let i = 0; i < this.file.length; i++) {
                var mimeType = this.file[i].type;
                if (mimeType.match(/image\/*/) == null) {
                    this.onlyImage = true;
                } else {
                    formData.push(this.file[i]);
                }
            }
            if (this.onlyImage) {
                this.onlyImage = false;
                this.toastr.error('Only images are supported.')
            }
            this.file = [];
            this.file = formData;
            // console.log("formData",this.file);
        }


    }

    imageClear() {
        this.file = [];
        this.ImageAttachments.patchValue(null);
        this.ImageAttachments.updateValueAndValidity();
    }

    searchInputvalues(value? : any): any {
        if (value === '') {
            return this.searchResult = []
        }
        this.searchResult = this.EmployeeList.filter((res : any) => {
            return res.userEmail.toLowerCase().startsWith(value.toLowerCase())
        });
        this.toggle = false;
    }

    showDetails(series : any) {
        this.selectedInput = series;
        this.toggle = true;
        this.searchInput = series.userEmail;
        this.ticket.get('CreatedForEmail').patchValue(series.userEmail);
        this.ticket.get('CreatedForEmail').updateValueAndValidity();
        this.ticket.get('CreatedForName').patchValue(series.userName);
        this.ticket.get('CreatedForName').updateValueAndValidity();

    }

}
