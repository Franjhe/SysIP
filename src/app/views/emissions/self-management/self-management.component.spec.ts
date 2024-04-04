import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfManagementComponent } from './self-management.component';

describe('SelfManagementComponent', () => {
  let component: SelfManagementComponent;
  let fixture: ComponentFixture<SelfManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfManagementComponent]
    });
    fixture = TestBed.createComponent(SelfManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
