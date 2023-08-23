import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssignTicketComponent } from './admin-assign-ticket.component';

describe('AdminAssignTicketComponent', () => {
  let component: AdminAssignTicketComponent;
  let fixture: ComponentFixture<AdminAssignTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssignTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssignTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
