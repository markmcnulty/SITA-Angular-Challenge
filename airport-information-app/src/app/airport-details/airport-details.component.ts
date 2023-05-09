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
import flightInformation from '../../assets/mock-data/departures.json';
import airportInformation from '../../assets/mock-data/full-airport-information.json';

// import airlineWebsiteInfo from '../../assets/mock-data/airlineWebsiteInfo.json';

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css'],
})
export class AirportDetailsComponent implements OnInit {
  departures = flightInformation.departures;
  arrivals = flightInformation.arrivals;
  dummyAirportInformation = airportInformation;
  // airlineWebsiteInfo = airlineWebsiteInfo;
  // realtimeInfo: any[] = [];
  dummyData: any;

  constructor(
    private airportService: AirportService,
    public shareService: ShareService
  ) {
    console.log(shareService.sharedIataCode);
  }

  ngOnInit(): void {
    // Here I was getting the iataCode passed by the landing component and rendering data
    // Due to limited API access I made an alternative to use static dummy code

    // this.airportService
    //   .getAirportInformationByIATA(this.shareService.sharedIataCode)
    //   .subscribe((data) => {
    //     console.log('InfoByIata:', data);
    //   });

    this.dummyData = this.dummyAirportInformation.find(
      (dd: any) => dd.iata === this.shareService.sharedIataCode
    );
  }
}
