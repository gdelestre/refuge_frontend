import { TestBed } from '@angular/core/testing';

import { VeterinaryService } from './veterinary.service';

describe('VeterinaryService', () => {
  let service: VeterinaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeterinaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
