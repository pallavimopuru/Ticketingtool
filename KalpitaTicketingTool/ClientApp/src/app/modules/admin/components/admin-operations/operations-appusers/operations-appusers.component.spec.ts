import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsAppusersComponent } from './operations-appusers.component';

describe('OperationsAppusersComponent', () => {
  let component: OperationsAppusersComponent;
  let fixture: ComponentFixture<OperationsAppusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsAppusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsAppusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
