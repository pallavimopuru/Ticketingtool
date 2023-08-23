import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsDistributionComponent } from './operations-distribution.component';

describe('OperationsDistributionComponent', () => {
  let component: OperationsDistributionComponent;
  let fixture: ComponentFixture<OperationsDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationsDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
