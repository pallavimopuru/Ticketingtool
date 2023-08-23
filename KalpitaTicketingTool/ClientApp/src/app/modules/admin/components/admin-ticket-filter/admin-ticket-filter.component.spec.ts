import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTicketFilterComponent } from './admin-ticket-filter.component';

describe('AdminTicketFilterComponent', () => {
  let component: AdminTicketFilterComponent;
  let fixture: ComponentFixture<AdminTicketFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTicketFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTicketFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
