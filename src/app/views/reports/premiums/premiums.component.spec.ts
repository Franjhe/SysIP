import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumsComponent } from './premiums.component';

describe('PremiumsComponent', () => {
  let component: PremiumsComponent;
  let fixture: ComponentFixture<PremiumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiumsComponent]
    });
    fixture = TestBed.createComponent(PremiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
