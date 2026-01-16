import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsFormPage } from './clients-form.page';

describe('ClientsFormPage', () => {
  let component: ClientsFormPage;
  let fixture: ComponentFixture<ClientsFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
