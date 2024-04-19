import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselImagesPubliComponent } from './carousel-images-publi.component';

describe('CarouselImagesPubliComponent', () => {
  let component: CarouselImagesPubliComponent;
  let fixture: ComponentFixture<CarouselImagesPubliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselImagesPubliComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselImagesPubliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
