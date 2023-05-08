import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  private readonly rapidapiHost = 'aerodatabox.p.rapidapi.com';
  private readonly rapidapiKey =
    ' b941164aeamshb3bc37286f9af0bp10053fjsn087d9d12dc4c';
  // 'https://aerodatabox.p.rapidapi.com/flights/airports/iata/DUB/2023-04-04T20:00/2023-04-05T08:00'
  private readonly departuresAndArrivalsApiUrl =
    // 'https://aerodatabox.p.rapidapi.com/flights/airports/iata/{iata}/2023-04-04T20:00/2023-04-05T08:00';
    'https://aerodatabox.p.rapidapi.com/flights/airports/iata/{iataCode}/2023-04-04T20:00/2023-04-05T08:00';
  private readonly getAirportInformationBySearchApiUrl =
    'https://aerodatabox.p.rapidapi.com/airports/search/term?q=';

  private readonly getAirportByCodeApiUrl =
    'https://aerodatabox.p.rapidapi.com/airports/iata/{iataCode}';

  //fetch a list of airports based on search input
  async getAirportInformation(query: string): Promise<Observable<any>> {
    const headers = new HttpHeaders()
      .set('X-RapidAPI-Host', this.rapidapiHost)
      .set('X-RapidAPI-Key', this.rapidapiKey);

    return await this.http.get(
      this.getAirportInformationBySearchApiUrl + query,
      {
        headers,
      }
    );
  }

  // //Fetch airport details by IATA code
  getAirportInformationByIATA(iataCode: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('X-RapidAPI-Host', this.rapidapiHost)
      .set('X-RapidAPI-Key', this.rapidapiKey);

    // return this.http.get(this.apiUrl + iataCode, { headers });

    return this.http.get(
      `https://aerodatabox.p.rapidapi.com/airports/iata/${iataCode}`,
      { headers }
    );
  }

  // //Fetch the next 6 departures and arrivals
  getAirportDeparturesAndArrivals(iataCode: string): Observable<any> {
    const dateNow = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:MM');
    let expiryDate = new Date(new Date().setHours(new Date().getHours() + 1));
    const futureDate = this.datePipe.transform(expiryDate, 'yyyy-MM-ddTHH:MM');

    const headers = new HttpHeaders()
      .set('X-RapidAPI-Host', this.rapidapiHost)
      .set('X-RapidAPI-Key', this.rapidapiKey);
    console.log('airport Service', iataCode);

    return this.http.get(
      `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${iataCode}/${dateNow}/${futureDate}`,
      { headers }
    );
  }
}
