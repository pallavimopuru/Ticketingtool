import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTicketHistoryComponent } from './user-ticket-history.component';

describe('UserTicketHistoryComponent', () => {
  let component: UserTicketHistoryComponent;
  let fixture: ComponentFixture<UserTicketHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTicketHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTicketHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
