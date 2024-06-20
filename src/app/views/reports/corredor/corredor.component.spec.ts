import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorredorComponent } from './corredor.component';

describe('CorredorComponent', () => {
  let component: CorredorComponent;
  let fixture: ComponentFixture<CorredorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorredorComponent]
    });
    fixture = TestBed.createComponent(CorredorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
