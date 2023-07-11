import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMainmenuComponent } from './delete-mainmenu.component';

describe('DeleteMainmenuComponent', () => {
  let component: DeleteMainmenuComponent;
  let fixture: ComponentFixture<DeleteMainmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteMainmenuComponent]
    });
    fixture = TestBed.createComponent(DeleteMainmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
