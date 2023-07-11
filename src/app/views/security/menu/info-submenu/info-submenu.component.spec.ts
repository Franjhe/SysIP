import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSubmenuComponent } from './info-submenu.component';

describe('InfoSubmenuComponent', () => {
  let component: InfoSubmenuComponent;
  let fixture: ComponentFixture<InfoSubmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoSubmenuComponent]
    });
    fixture = TestBed.createComponent(InfoSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
