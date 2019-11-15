import { TestBed } from '@angular/core/testing';

import { BlogEnvironmentServiceService } from './blog-environment-service.service';

describe('BlogEnvironmentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogEnvironmentServiceService = TestBed.get(BlogEnvironmentServiceService);
    expect(service).toBeTruthy();
  });
});
