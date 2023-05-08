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
import flightInformation from '../../departures.json';
import airportInformation from '../../assets/mock-airport-information.json';
import airlineWebsiteInfo from '../../airlineWebsiteInfo.json';
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
  // flights: any[] = [];
  departures = flightInformation.departures;
  arrivals = flightInformation.arrivals;
  airportInfo = airportInformation;
  airlineWebsiteInfo = airlineWebsiteInfo;
  realtimeInfo: any[] = [];

  constructor(
    private airportService: AirportService,
    public shareService: ShareService
  ) {
    console.log('airportInfo', this.airportInfo);
    console.log('airlineWebsiteInfo', this.airlineWebsiteInfo);
    console.log(airlineWebsiteInfo.urls.webSite);
  }

  ngOnInit(): void {
    console.log('MYDATA- Airport details', this.shareService.myData);

    this.airportService
      .getAirportInformationByIATA(this.shareService.myData)
      .subscribe((data) => {
        console.log('InfoByIata:', data);
      });
  }
}
function prepareDepartureData() {
  throw new Error('Function not implemented.');
}
