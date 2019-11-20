import { TestBed } from '@angular/core/testing';

import { BlogMarkdownTransformService } from './blog-markdown-transform.service';

describe('BlogMarkdownTransformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogMarkdownTransformService = TestBed.get(BlogMarkdownTransformService);
    expect(service).toBeTruthy();
  });
});
