import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  private readonly rapidapiHost = 'aerodatabox.p.rapidapi.com';
  private readonly rapidapiKey =
    '90280db5c3mshbc81c66f5f7a9a7p129ca6jsn7d9c269d4013';
  private readonly apiUrl = 'https://aerodatabox.p.rapidapi.com/airports/';
  // private readonly apiUrl = 'https://doc.aerodatabox.com/';

  constructor(private http: HttpClient) {}

  getAirportInformation(icaoCode: string): Observable<any> {
    const headers = {
      'X-RapidAPI-Host': this.rapidapiHost,
      'X-RapidAPI-Key': this.rapidapiKey,
    };

    const fromLocal = '2023-05-04T00:00';
    const toLocal = '2023-05-08T00:00';

    console.log('icaoCode:' + icaoCode);
    console.log('Headers HOST:' + headers['X-RapidAPI-Host']);
    console.log('Headers APIKEY:' + headers['X-RapidAPI-Key']);
    // https://doc.aerodatabox.com/?ICAO=KSFO

    // https://aerodatabox.p.rapidapi.com/flights/airports/ICAO/KSFO/2023-05-04T00:00/2023-08-04T00:00
    console.log('Returned?');

    return this.http.get(
      // https://aerodatabox.p.rapidapi.com/airports/{codeType}/{code}
      `${this.apiUrl}?ICAO=${icaoCode}`,
      { headers }
    );
  }

  //fetch a list of airports based on search input

  //Fetch airport details by IATA code

  //Fetch the next 6 departures and arrivals
}
