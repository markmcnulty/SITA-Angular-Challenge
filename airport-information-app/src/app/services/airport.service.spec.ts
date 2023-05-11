import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AirportService } from './airport.service';

describe('AirportService', () => {
  let service: AirportService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AirportService],
    });
    service = TestBed.inject(AirportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return an Observable<any> when called with a query string', () => {
    const query = 'Dublin';
    const mockResponse = {
      icao: 'EIDW',
      iata: 'DUB',
      name: 'Dublin',
      shortName: 'Dublin',
      municipalityName: 'Dublin',
      location: {
        lat: 53.4213,
        lon: -6.27007,
      },
      countryCode: 'IE',
    };
    service.getAirportInformation(query).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(
      `https://aerodatabox.p.rapidapi.com/airports/search/term?q=${query}`
    );
    expect(request.request.method).toBe('GET');

    request.flush(mockResponse);
  });

  it('should throw an error if the API call fails', () => {
    const query = 'InvalidQuery';

    service.getAirportInformation(query).subscribe(
      () => {},
      (error) => {
        expect(error).toEqual('Something went wrong, check error message.');
      }
    );

    const request = httpMock.expectOne(
      `https://aerodatabox.p.rapidapi.com/airports/search/term?q=${query}`
    );
    expect(request.request.method).toBe('GET');

    request.error(new ErrorEvent('API Error'));
  });
});
