import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsFormPage } from './items-form.page';

describe('ItemsFormPage', () => {
  let component: ItemsFormPage;
  let fixture: ComponentFixture<ItemsFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
