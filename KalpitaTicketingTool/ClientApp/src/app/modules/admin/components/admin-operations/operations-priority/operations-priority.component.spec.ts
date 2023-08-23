import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsPriorityComponent } from './operations-priority.component';

describe('OperationsPriorityComponent', () => {
  let component: OperationsPriorityComponent;
  let fixture: ComponentFixture<OperationsPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsPriorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
