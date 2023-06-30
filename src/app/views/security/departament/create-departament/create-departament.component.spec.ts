import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartamentComponent } from './create-departament.component';

describe('CreateDepartamentComponent', () => {
  let component: CreateDepartamentComponent;
  let fixture: ComponentFixture<CreateDepartamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDepartamentComponent]
    });
    fixture = TestBed.createComponent(CreateDepartamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
