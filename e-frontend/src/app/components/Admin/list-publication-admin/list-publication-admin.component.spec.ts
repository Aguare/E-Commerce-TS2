import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPublicationAdminComponent } from './list-publication-admin.component';

describe('ListPublicationAdminComponent', () => {
  let component: ListPublicationAdminComponent;
  let fixture: ComponentFixture<ListPublicationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPublicationAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPublicationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
