import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDepartamentComponent } from './info-departament.component';

describe('InfoDepartamentComponent', () => {
  let component: InfoDepartamentComponent;
  let fixture: ComponentFixture<InfoDepartamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoDepartamentComponent]
    });
    fixture = TestBed.createComponent(InfoDepartamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
