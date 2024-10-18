import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackButtonFunctionComponent } from './black-button-function.component';

describe('BlackButtonFunctionComponent', () => {
  let component: BlackButtonFunctionComponent;
  let fixture: ComponentFixture<BlackButtonFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlackButtonFunctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackButtonFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
