import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomProductListComponent } from './random-product-list.component';

describe('RandomProductListComponent', () => {
  let component: RandomProductListComponent;
  let fixture: ComponentFixture<RandomProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
