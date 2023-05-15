import { Component } from '@angular/core';

import { ShareService } from '../services/share.service';
import { ActivatedRoute } from '@angular/router';

import flightInformation from '../../assets/mock-data/departures.json';

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css'],
})
export class AirportDetailsComponent {
  currentTime: Date = new Date();
  departures = flightInformation.departures;
  arrivals = flightInformation.arrivals;

  airportInformation: any;

  constructor(
    public shareService: ShareService,
    private route: ActivatedRoute
  ) {
    this.airportInformation = this.route.snapshot.data['resolvedData'];

    /*
     * Setting this interval so the time updates in the UI
     */
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
}
