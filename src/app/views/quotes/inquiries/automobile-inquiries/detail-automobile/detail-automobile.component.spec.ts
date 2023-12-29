import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAutomobileComponent } from './detail-automobile.component';

describe('DetailAutomobileComponent', () => {
  let component: DetailAutomobileComponent;
  let fixture: ComponentFixture<DetailAutomobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailAutomobileComponent]
    });
    fixture = TestBed.createComponent(DetailAutomobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
