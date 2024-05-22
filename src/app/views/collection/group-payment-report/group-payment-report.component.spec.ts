import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPaymentReportComponent } from './group-payment-report.component';

describe('GroupPaymentReportComponent', () => {
  let component: GroupPaymentReportComponent;
  let fixture: ComponentFixture<GroupPaymentReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupPaymentReportComponent]
    });
    fixture = TestBed.createComponent(GroupPaymentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
