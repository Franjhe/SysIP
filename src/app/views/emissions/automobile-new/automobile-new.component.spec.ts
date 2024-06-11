import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobileNewComponent } from './automobile-new.component';

describe('AutomobileNewComponent', () => {
  let component: AutomobileNewComponent;
  let fixture: ComponentFixture<AutomobileNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomobileNewComponent]
    });
    fixture = TestBed.createComponent(AutomobileNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
