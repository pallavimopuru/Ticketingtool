import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewTicketComponent } from './user-view-ticket.component';

describe('UserViewTicketComponent', () => {
  let component: UserViewTicketComponent;
  let fixture: ComponentFixture<UserViewTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
