import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewTicketComponent } from './admin-view-ticket.component';

describe('AdminViewTicketComponent', () => {
  let component: AdminViewTicketComponent;
  let fixture: ComponentFixture<AdminViewTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
