import { TestBed } from '@angular/core/testing';

import { ApiInventiaService } from './api-inventia.service';

describe('ApiInventiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiInventiaService = TestBed.get(ApiInventiaService);
    expect(service).toBeTruthy();
  });
});
