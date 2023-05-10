import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AirportService } from '../services/airport.service';
import { ShareService } from './share.service';

@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<any> {
  constructor(
    private airportService: AirportService,
    private shareService: ShareService
  ) {}

  resolve(): Observable<any> | Promise<any> | any {
    return this.airportService.getAirportInformationByIATA(
      this.shareService.iataCode
    );
  }
}
