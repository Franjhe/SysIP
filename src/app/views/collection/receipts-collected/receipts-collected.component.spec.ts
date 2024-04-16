import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsCollectedComponent } from './receipts-collected.component';

describe('ReceiptsCollectedComponent', () => {
  let component: ReceiptsCollectedComponent;
  let fixture: ComponentFixture<ReceiptsCollectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptsCollectedComponent]
    });
    fixture = TestBed.createComponent(ReceiptsCollectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
