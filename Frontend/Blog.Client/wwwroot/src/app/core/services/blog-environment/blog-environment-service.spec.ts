import { TestBed } from '@angular/core/testing';

import { BlogEnvironmentService } from './blog-environment-service';

describe('BlogEnvironmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogEnvironmentService = TestBed.get(BlogEnvironmentService);
    expect(service).toBeTruthy();
  });
});
