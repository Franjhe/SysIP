import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobileQuotesComponent } from './automobile-quotes.component';

describe('AutomobileQuotesComponent', () => {
  let component: AutomobileQuotesComponent;
  let fixture: ComponentFixture<AutomobileQuotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomobileQuotesComponent]
    });
    fixture = TestBed.createComponent(AutomobileQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
