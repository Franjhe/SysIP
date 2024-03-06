import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuretyQuotesComponent } from './surety-quotes.component';

describe('SuretyQuotesComponent', () => {
  let component: SuretyQuotesComponent;
  let fixture: ComponentFixture<SuretyQuotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuretyQuotesComponent]
    });
    fixture = TestBed.createComponent(SuretyQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
