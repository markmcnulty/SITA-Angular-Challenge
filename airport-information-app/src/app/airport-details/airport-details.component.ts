import {
  OnInit,
  ElementRef,
  Component,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';

import { AirportService } from '../services/airport.service';
import { ShareService } from '../services/share.service';
import { AirportDepartureInformation } from '../models/airport-departure-info.model';
// import departures from '../../assets/departures';

import { GoogleMapsComponent } from '../google-maps/google-maps.component';
import flightInformation from '../../assets/mock-data/departures.json';
import airportInformation from '../../assets/mock-data/full-airport-information.json';

import airlineWebsiteInfo from '../../assets/mock-data/airlineWebsiteInfo.json';
// import { SvgMapComponent } from '../svg-map/svg-map.component';
// export interface Tile {
//   color: string;
//   cols: number;
//   rows: number;
//   id: number;
// }

// export interface ActualPeriodicElement {
//   position: number;
//   time: string;
//   number: string;
//   status: string;
// }

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css'],
})
export class AirportDetailsComponent implements OnInit {
  departures = flightInformation.departures;
  arrivals = flightInformation.arrivals;
  dummyAirportInformation = airportInformation;
  airlineWebsiteInfo = airlineWebsiteInfo;
  realtimeInfo: any[] = [];
  dummyData: any;

  constructor(
    private airportService: AirportService,
    public shareService: ShareService
  ) {
    console.log(shareService.sharedIataCode);
  }

  ngOnInit(): void {
    // this.airportService
    //   .getAirportInformationByIATA(this.shareService.sharedIataCode)
    //   .subscribe((data) => {
    //     console.log('InfoByIata:', data);
    //   });

    this.dummyData = this.dummyAirportInformation.find(
      (dd: any) => dd.iata === this.shareService.sharedIataCode
    );

    console.log(this.dummyData);
  }
}
