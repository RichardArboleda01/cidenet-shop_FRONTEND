import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSlideComponent } from './cart-slide.component';

describe('CartSlideComponent', () => {
  let component: CartSlideComponent;
  let fixture: ComponentFixture<CartSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
