import { TestBed } from '@angular/core/testing';

import { ContentDiscoveryService } from './content-discovery.service';

describe('ContentDiscoveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentDiscoveryService = TestBed.get(ContentDiscoveryService);
    expect(service).toBeTruthy();
  });
});
