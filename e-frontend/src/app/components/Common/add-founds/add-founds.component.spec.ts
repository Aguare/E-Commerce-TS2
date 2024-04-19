import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoundsComponent } from './add-founds.component';

describe('AddFoundsComponent', () => {
  let component: AddFoundsComponent;
  let fixture: ComponentFixture<AddFoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFoundsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
