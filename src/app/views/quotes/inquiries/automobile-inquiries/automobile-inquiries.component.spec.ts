import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobileInquiriesComponent } from './automobile-inquiries.component';

describe('AutomobileInquiriesComponent', () => {
  let component: AutomobileInquiriesComponent;
  let fixture: ComponentFixture<AutomobileInquiriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomobileInquiriesComponent]
    });
    fixture = TestBed.createComponent(AutomobileInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
