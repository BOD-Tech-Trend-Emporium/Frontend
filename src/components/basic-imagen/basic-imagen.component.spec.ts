import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicImagenComponent } from './basic-imagen.component';

describe('CarouselImagenComponent', () => {
  let component: BasicImagenComponent;
  let fixture: ComponentFixture<BasicImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicImagenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
