import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubmenuComponent } from './delete-submenu.component';

describe('DeleteSubmenuComponent', () => {
  let component: DeleteSubmenuComponent;
  let fixture: ComponentFixture<DeleteSubmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSubmenuComponent]
    });
    fixture = TestBed.createComponent(DeleteSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
