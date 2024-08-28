import { TestBed } from '@angular/core/testing';

import { GenerateIdService } from './generate-id.service';

describe('GenerateIdService', () => {
  let service: GenerateIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
