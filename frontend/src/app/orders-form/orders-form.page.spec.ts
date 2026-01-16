import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersFormPage } from './orders-form.page';

describe('OrdersFormPage', () => {
  let component: OrdersFormPage;
  let fixture: ComponentFixture<OrdersFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
