import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsTickettypeComponent } from './operations-tickettype.component';

describe('OperationsTickettypeComponent', () => {
  let component: OperationsTickettypeComponent;
  let fixture: ComponentFixture<OperationsTickettypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsTickettypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsTickettypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
