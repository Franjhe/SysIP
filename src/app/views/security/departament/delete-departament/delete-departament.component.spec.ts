import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDepartamentComponent } from './delete-departament.component';

describe('DeleteDepartamentComponent', () => {
  let component: DeleteDepartamentComponent;
  let fixture: ComponentFixture<DeleteDepartamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDepartamentComponent]
    });
    fixture = TestBed.createComponent(DeleteDepartamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
