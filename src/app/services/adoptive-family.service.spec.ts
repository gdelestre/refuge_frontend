import { TestBed } from '@angular/core/testing';

import { AdoptiveFamilyService } from './adoptive-family.service';

describe('AdoptiveFamilyService', () => {
  let service: AdoptiveFamilyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptiveFamilyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
