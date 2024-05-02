import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusAndCommissionsComponent } from './bonus-and-commissions.component';

describe('BonusAndCommissionsComponent', () => {
  let component: BonusAndCommissionsComponent;
  let fixture: ComponentFixture<BonusAndCommissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BonusAndCommissionsComponent]
    });
    fixture = TestBed.createComponent(BonusAndCommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
