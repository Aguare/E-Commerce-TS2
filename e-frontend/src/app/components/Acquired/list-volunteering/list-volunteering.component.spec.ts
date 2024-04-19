import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVolunteeringComponent } from './list-volunteering.component';

describe('ListVolunteeringComponent', () => {
  let component: ListVolunteeringComponent;
  let fixture: ComponentFixture<ListVolunteeringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListVolunteeringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListVolunteeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
