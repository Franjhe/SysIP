import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubmenuComponent } from './create-submenu.component';

describe('CreateSubmenuComponent', () => {
  let component: CreateSubmenuComponent;
  let fixture: ComponentFixture<CreateSubmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSubmenuComponent]
    });
    fixture = TestBed.createComponent(CreateSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
