import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPublicationComponent } from './carousel-publication.component';

describe('CarouselPublicationComponent', () => {
  let component: CarouselPublicationComponent;
  let fixture: ComponentFixture<CarouselPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselPublicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
