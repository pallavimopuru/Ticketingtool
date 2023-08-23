import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTicketHistoryComponent } from './admin-ticket-history.component';

describe('AdminTicketHistoryComponent', () => {
  let component: AdminTicketHistoryComponent;
  let fixture: ComponentFixture<AdminTicketHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTicketHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTicketHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
