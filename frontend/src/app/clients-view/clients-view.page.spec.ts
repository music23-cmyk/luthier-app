import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsViewPage } from './clients-view.page';

describe('ClientsViewPage', () => {
  let component: ClientsViewPage;
  let fixture: ComponentFixture<ClientsViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
