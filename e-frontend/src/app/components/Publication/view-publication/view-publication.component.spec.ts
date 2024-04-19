import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPublicationComponent } from './view-publication.component';

describe('ViewPublicationComponent', () => {
  let component: ViewPublicationComponent;
  let fixture: ComponentFixture<ViewPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPublicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
