import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobilePolicyComponent } from './automobile-policy.component';

describe('AutomobilePolicyComponent', () => {
  let component: AutomobilePolicyComponent;
  let fixture: ComponentFixture<AutomobilePolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomobilePolicyComponent]
    });
    fixture = TestBed.createComponent(AutomobilePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
