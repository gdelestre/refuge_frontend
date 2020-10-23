import { TestBed } from '@angular/core/testing';

import { AdoptAnimalService } from './adopt-animal.service';

describe('AdoptAnimalService', () => {
  let service: AdoptAnimalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptAnimalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
