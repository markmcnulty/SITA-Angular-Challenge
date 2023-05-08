import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  private readonly rapidapiHost = 'aerodatabox.p.rapidapi.com';
  private readonly rapidapiKey =
    '90280db5c3mshbc81c66f5f7a9a7p129ca6jsn7d9c269d4013';
  // 'https://aerodatabox.p.rapidapi.com/flights/airports/iata/DUB/2023-04-04T20:00/2023-04-05T08:00'
  private readonly departuresAndArrivalsApiUrl =
    // 'https://aerodatabox.p.rapidapi.com/flights/airports/iata/{iata}/2023-04-04T20:00/2023-04-05T08:00';
    'https://aerodatabox.p.rapidapi.com/flights/airports/iata/{iataCode}/2023-04-04T20:00/2023-04-05T08:00';
  private readonly getAirportInformationApiUrl =
    'https://aerodatabox.p.rapidapi.com/airports/search/term?q=';
  // private readonly apiUrl = 'https://aerodatabox.p.rapidapi.com/airports/search/term?q=sfo&limit=10';

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  //fetch a list of airports based on search input
  async getAirportInformation(query: string): Promise<Observable<any>> {
    const headers = new HttpHeaders()
      .set('X-RapidAPI-Host', this.rapidapiHost)
      .set('X-RapidAPI-Key', this.rapidapiKey);

    return await this.http.get(this.getAirportInformationApiUrl + query, {
      headers,
    });
  }

  // //Fetch airport details by IATA code
  // getAirportInformationByIATA(iataCode: string): Observable<any> {
  //   const headers = new HttpHeaders()
  //     .set('X-RapidAPI-Host', this.rapidapiHost)
  //     .set('X-RapidAPI-Key', this.rapidapiKey);

  //   // return this.http.get(this.apiUrl + iataCode, { headers });

  //   return this.http.get(this.departuresAndArrivalsApiUrl, { headers });
  // }

  // //Fetch the next 6 departures and arrivals
  async getAirportDeparturesAndArrivals(
    iataCode: string
  ): Promise<Observable<any>> {
    const dateNow = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:MM');
    let expiryDate = new Date(new Date().setHours(new Date().getHours() + 1));
    const futureDate = this.datePipe.transform(expiryDate, 'yyyy-MM-ddTHH:MM');

    console.log('Time Now:', dateNow);
    console.log('Expiry Now:', futureDate);
    const headers = new HttpHeaders()
      .set('X-RapidAPI-Host', this.rapidapiHost)
      .set('X-RapidAPI-Key', this.rapidapiKey);
    console.log('airport Service', iataCode);

    return await this.http.get(
      `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${iataCode}/${dateNow}/${futureDate}`,
      { headers }
    );

    // return this.http.get(this.apiUrl + iataCode, { headers });
  }
}
