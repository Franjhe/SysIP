import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubmenuComponent } from './update-submenu.component';

describe('UpdateSubmenuComponent', () => {
  let component: UpdateSubmenuComponent;
  let fixture: ComponentFixture<UpdateSubmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSubmenuComponent]
    });
    fixture = TestBed.createComponent(UpdateSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
