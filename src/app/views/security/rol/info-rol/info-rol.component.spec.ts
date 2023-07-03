import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRolComponent } from './info-rol.component';

describe('InfoRolComponent', () => {
  let component: InfoRolComponent;
  let fixture: ComponentFixture<InfoRolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoRolComponent]
    });
    fixture = TestBed.createComponent(InfoRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
