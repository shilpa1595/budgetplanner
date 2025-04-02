import { TestBed } from '@angular/core/testing';

import { CategorylistService } from './categorylist.service';

describe('CategorylistService', () => {
  let service: CategorylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
