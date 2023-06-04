import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacedSuccessComponent } from './placed-success.component';

describe('PlacedSuccessComponent', () => {
  let component: PlacedSuccessComponent;
  let fixture: ComponentFixture<PlacedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacedSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
