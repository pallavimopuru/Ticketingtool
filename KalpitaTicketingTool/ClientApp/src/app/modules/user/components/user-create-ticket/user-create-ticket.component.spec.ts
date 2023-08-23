import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateTicketComponent } from './user-create-ticket.component';

describe('UserCreateTicketComponent', () => {
  let component: UserCreateTicketComponent;
  let fixture: ComponentFixture<UserCreateTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
