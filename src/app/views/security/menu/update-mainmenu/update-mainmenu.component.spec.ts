import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMainmenuComponent } from './update-mainmenu.component';

describe('UpdateMainmenuComponent', () => {
  let component: UpdateMainmenuComponent;
  let fixture: ComponentFixture<UpdateMainmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMainmenuComponent]
    });
    fixture = TestBed.createComponent(UpdateMainmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
