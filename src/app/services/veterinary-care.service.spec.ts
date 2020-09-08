import { TestBed } from '@angular/core/testing';

import { VeterinaryCareService } from './veterinary-care.service';

describe('VeterinaryCareService', () => {
  let service: VeterinaryCareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeterinaryCareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
