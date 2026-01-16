import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderViewPage } from './order-view.page';

describe('OrderViewPage', () => {
  let component: OrderViewPage;
  let fixture: ComponentFixture<OrderViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
