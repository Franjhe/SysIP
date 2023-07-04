import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMainmenuComponent } from './create-mainmenu.component';

describe('CreateMainmenuComponent', () => {
  let component: CreateMainmenuComponent;
  let fixture: ComponentFixture<CreateMainmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMainmenuComponent]
    });
    fixture = TestBed.createComponent(CreateMainmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
