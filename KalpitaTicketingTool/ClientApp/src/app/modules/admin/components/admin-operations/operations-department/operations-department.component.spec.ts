import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsDepartmentComponent } from './operations-department.component';

describe('OperationsDepartmentComponent', () => {
  let component: OperationsDepartmentComponent;
  let fixture: ComponentFixture<OperationsDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
