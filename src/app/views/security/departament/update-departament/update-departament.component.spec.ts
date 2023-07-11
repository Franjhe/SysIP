import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepartamentComponent } from './update-departament.component';

describe('UpdateDepartamentComponent', () => {
  let component: UpdateDepartamentComponent;
  let fixture: ComponentFixture<UpdateDepartamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDepartamentComponent]
    });
    fixture = TestBed.createComponent(UpdateDepartamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
