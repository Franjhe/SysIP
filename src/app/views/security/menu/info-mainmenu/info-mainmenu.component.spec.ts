import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMainmenuComponent } from './info-mainmenu.component';

describe('InfoMainmenuComponent', () => {
  let component: InfoMainmenuComponent;
  let fixture: ComponentFixture<InfoMainmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoMainmenuComponent]
    });
    fixture = TestBed.createComponent(InfoMainmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
