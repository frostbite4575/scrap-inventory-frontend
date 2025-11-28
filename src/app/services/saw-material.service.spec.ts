import { TestBed } from '@angular/core/testing';

import { SawMaterialService } from './saw-material.service';

describe('SawMaterialService', () => {
  let service: SawMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SawMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
