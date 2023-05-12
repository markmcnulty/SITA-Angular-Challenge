import { Component, OnInit } from '@angular/core';
import { AirportService } from '../services/airport.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnInit {
  airportInformation: any;

  //defaulting to dublin
  latitude: number = 53.4213;
  longitude: number = -6.27007;

  constructor(
    private airportService: AirportService,
    public shareService: ShareService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.airportInformation = await this.airportService
        .getAirportInformationByIATA(this.shareService.iataCode)
        .toPromise();
      this.loadMap();
    } catch (error) {
      console.error('Error retrieving airport information:', error);
    }
  }

  loadMap() {
    const mapOptions = {
      center: new google.maps.LatLng(
        this.airportInformation.location.lat,
        this.airportInformation.location.lon
      ),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    const mapContainer = document.getElementById('map') as HTMLElement;
    const map = new google.maps.Map(mapContainer, mapOptions);
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        this.airportInformation.location.lat,
        this.airportInformation.location.lon
      ),
      map: map,
    });
  }
}
