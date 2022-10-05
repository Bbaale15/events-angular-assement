import { TestBed } from '@angular/core/testing';

import { ArtistesEventsService } from './artistes-events.service';

describe('ArtistesEventsService', () => {
  let service: ArtistesEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistesEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
