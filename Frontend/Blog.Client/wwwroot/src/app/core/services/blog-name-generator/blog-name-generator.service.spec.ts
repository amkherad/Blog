import { TestBed } from '@angular/core/testing';

import { BlogNameGeneratorService } from './blog-name-generator.service';

describe('BlogNameGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogNameGeneratorService = TestBed.get(BlogNameGeneratorService);
    expect(service).toBeTruthy();
  });
});
