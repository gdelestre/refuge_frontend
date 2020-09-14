import { TestBed } from '@angular/core/testing';

import { HostFamilyService } from './host-family.service';

describe('HostFamilyService', () => {
  let service: HostFamilyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostFamilyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
