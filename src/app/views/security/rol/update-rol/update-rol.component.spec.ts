import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRolComponent } from './update-rol.component';

describe('UpdateRolComponent', () => {
  let component: UpdateRolComponent;
  let fixture: ComponentFixture<UpdateRolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRolComponent]
    });
    fixture = TestBed.createComponent(UpdateRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
