import { TestBed } from '@angular/core/testing';

import { TouchFreeService } from './touch-free.service';

describe('TouchFreeService', () => {
  let service: TouchFreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouchFreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
