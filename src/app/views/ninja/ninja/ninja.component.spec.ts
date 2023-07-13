import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinjaComponent } from './ninja.component';

describe('NinjaComponent', () => {
  let component: NinjaComponent;
  let fixture: ComponentFixture<NinjaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NinjaComponent]
    });
    fixture = TestBed.createComponent(NinjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
