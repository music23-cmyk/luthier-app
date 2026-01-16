import { TestBed } from '@angular/core/testing';

import { ClientServices } from './client-services';

describe('ClientServices', () => {
  let service: ClientServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
