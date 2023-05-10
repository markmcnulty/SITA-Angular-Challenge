import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  private readonly rapidapiHost = 'aerodatabox.p.rapidapi.com';
  private readonly rapidapiKey = 'ENTER-YOUR-RAPID-API-KEY-HERE';

  //fetch a list of airports based on search input
  getAirportInformation(query: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('X-RapidAPI-Host', this.rapidapiHost)
      .set('X-RapidAPI-Key', this.rapidapiKey);

    return this.http
      .get(
        `https://aerodatabox.p.rapidapi.com/airports/search/term?q=${query}`,
        {
          headers,
        }
      )
      .pipe(
        catchError((error) => {
          console.error('getAirportInformation API Error', error);
          return throwError(() => 'Something went wrong, check error message.');
        })
      );
  }

  // Fetch airport details by IATA code
  getAirportInformationByIATA(iataCode: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('X-RapidAPI-Host', this.rapidapiHost)
      .set('X-RapidAPI-Key', this.rapidapiKey);

    return this.http
      .get(`https://aerodatabox.p.rapidapi.com/airports/iata/${iataCode}`, {
        headers,
      })
      .pipe(
        catchError((error) => {
          console.error('getAirportInformationByIATA API Error', error);
          return throwError(() => 'Something went wrong, check error message.');
        })
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

    return this.http
      .get(
        `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${iataCode}/${dateNow}/${futureDate}`,
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error('getAirportDeparturesAndArrivals API Error', error);
          return throwError(() => 'Something went wrong, check error message.');
        })
      );
  }
}
