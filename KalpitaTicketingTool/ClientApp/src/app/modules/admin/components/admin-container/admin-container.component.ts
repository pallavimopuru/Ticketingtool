import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'
@Component({
  selector: 'app-admin-container',
  templateUrl:'./admin-container.component.html',
  styleUrls: ['./admin-container.component.css']
})
export class AdminContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    sessionStorage.setItem("getURL",'/admin')
  }

}
