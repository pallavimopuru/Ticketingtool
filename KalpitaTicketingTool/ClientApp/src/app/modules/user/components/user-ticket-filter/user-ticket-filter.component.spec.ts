import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTicketFilterComponent } from './user-ticket-filter.component';

describe('UserTicketFilterComponent', () => {
  let component: UserTicketFilterComponent;
  let fixture: ComponentFixture<UserTicketFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTicketFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTicketFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
