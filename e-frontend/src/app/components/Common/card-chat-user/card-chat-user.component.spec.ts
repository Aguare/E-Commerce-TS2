import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChatUserComponent } from './card-chat-user.component';

describe('CardChatUserComponent', () => {
  let component: CardChatUserComponent;
  let fixture: ComponentFixture<CardChatUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardChatUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardChatUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
