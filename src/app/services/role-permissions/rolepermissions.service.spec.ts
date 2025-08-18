import { TestBed } from '@angular/core/testing';

import { RolePermissionsService } from './rolepermissions.service';

describe('RolepermissionsService', () => {
  let service: RolePermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolePermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
