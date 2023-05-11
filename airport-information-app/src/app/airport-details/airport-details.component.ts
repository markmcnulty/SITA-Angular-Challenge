import { OnInit, Component } from '@angular/core';

import { AirportService } from '../services/airport.service';
import { ShareService } from '../services/share.service';
import { ActivatedRoute } from '@angular/router';

import flightInformation from '../../assets/mock-data/departures.json';
import airportInformation from '../../assets/mock-data/full-airport-information.json';

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css'],
})
export class AirportDetailsComponent implements OnInit {
  currentTime: Date = new Date();
  departures = flightInformation.departures;
  arrivals = flightInformation.arrivals;
  dummyAirportInformation = airportInformation;
  dummyData: any;
  latitude: number = 53.4213;
  longitude: number = -6.27007;

  airportInformation: any;

  constructor(
    private airportService: AirportService,
    public shareService: ShareService,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((data) => {
      this.airportInformation = data;
    });
    this.latitude = this.airportInformation.data.location.lat;
    this.longitude = this.airportInformation.data.location.lon;

    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    //Uncomment to use dummy data
    // this.dummyData = this.dummyAirportInformation.find(
    //   (dd: any) => dd.iata === this.shareService.iataCode
    // );

    this.loadMap();
  }

  loadMap() {
    const mapOptions = {
      center: new google.maps.LatLng(this.latitude, this.longitude),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    const mapContainer = document.getElementById('map') as HTMLElement;
    const map = new google.maps.Map(mapContainer, mapOptions);
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.latitude, this.longitude),
      map: map,
    });
  }
}
