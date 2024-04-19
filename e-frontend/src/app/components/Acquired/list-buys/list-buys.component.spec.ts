import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuysComponent } from './list-buys.component';

describe('ListBuysComponent', () => {
  let component: ListBuysComponent;
  let fixture: ComponentFixture<ListBuysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBuysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBuysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
