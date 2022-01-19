import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByColorComponent } from './get-by-color.component';

describe('GetByColorComponent', () => {
  let component: GetByColorComponent;
  let fixture: ComponentFixture<GetByColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetByColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetByColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
