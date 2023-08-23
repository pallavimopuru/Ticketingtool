import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsTicketstatusComponent } from './operations-ticketstatus.component';

describe('OperationsTicketstatusComponent', () => {
  let component: OperationsTicketstatusComponent;
  let fixture: ComponentFixture<OperationsTicketstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsTicketstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsTicketstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
