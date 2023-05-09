import { Component, OnInit } from '@angular/core';
import { ShareService } from '../services/share.service';
import airportInformation from '../../assets/mock-data/full-airport-information.json';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'],
})
export class GoogleMapsComponent implements OnInit {
  latitude: number = 53.4213;
  longitude: number = -6.27007;
  dummyData: any;
  dummyAirportInformation = airportInformation;

  constructor(public shareService: ShareService) {
    //using dummy data for the extraction due to limited API's
    this.dummyData = this.dummyAirportInformation.find(
      (dd: any) => dd.iata === this.shareService.sharedIataCode
    );

    // Passing the latitude and longtitude of the airport selected on the landing page
    if (this.dummyData) {
      this.latitude = this.dummyData.location.lat;
      this.longitude = this.dummyData.location.lon;
    }
    // this.latitude = this.dummyData.location.lat;
    // this.longitude = this.dummyData.location.lon;
  }
  ngOnInit(): void {
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
