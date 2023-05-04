import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  private readonly rapidapiHost = 'aerodatabox.p.rapidapi.com';
  private readonly rapidapiKey =
    '90280db5c3mshbc81c66f5f7a9a7p129ca6jsn7d9c269d4013';
  private readonly apiUrl = 'https://aerodatabox.p.rapidapi.com/airports/icao/';
  private readonly freetextApiUrl =
    'https://aerodatabox.p.rapidapi.com/airports/search/term?q=';
  // private readonly apiUrl = 'https://aerodatabox.p.rapidapi.com/airports/search/term?q=sfo&limit=10';

  constructor(private http: HttpClient) {}

  getAirportInformationByICAO(icaoCode: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('X-RapidAPI-Host', this.rapidapiHost)
      .set('X-RapidAPI-Key', this.rapidapiKey);

    return this.http.get(this.apiUrl + icaoCode, { headers });
  }

  // getAirportInformation(): Observable<any> {
  getAirportInformation(query: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('X-RapidAPI-Host', this.rapidapiHost)
      .set('X-RapidAPI-Key', this.rapidapiKey);

    return this.http.get(this.freetextApiUrl + query, { headers });
    // return this.http.get(this.freetextApiUrl + query, { headers });
  }

  // getAirportInformationByIATA(iataCode: string): Observable<any> {
  //   const headers = new HttpHeaders()
  //     .set('X-RapidAPI-Host', this.rapidapiHost)
  //     .set('X-RapidAPI-Key', this.rapidapiKey);

  //   return this.http.get(this.apiUrl + iataCode, { headers });
  // }
  //fetch a list of airports based on search input

  //Fetch airport details by IATA code

  //Fetch the next 6 departures and arrivals
}
