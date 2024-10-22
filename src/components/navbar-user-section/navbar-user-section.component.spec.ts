import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUserSectionComponent } from './navbar-user-section.component';

describe('NavbarUserSectionComponent', () => {
  let component: NavbarUserSectionComponent;
  let fixture: ComponentFixture<NavbarUserSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarUserSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarUserSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
