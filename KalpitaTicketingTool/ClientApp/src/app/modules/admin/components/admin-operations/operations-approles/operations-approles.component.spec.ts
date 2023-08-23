import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsApprolesComponent } from './operations-approles.component';

describe('OperationsApprolesComponent', () => {
  let component: OperationsApprolesComponent;
  let fixture: ComponentFixture<OperationsApprolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsApprolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsApprolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
