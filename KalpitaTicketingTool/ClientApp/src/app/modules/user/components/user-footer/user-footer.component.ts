import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.css']
})
export class UserFooterComponent implements OnInit {
  anio: number = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
