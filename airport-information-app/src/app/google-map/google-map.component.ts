import { Component, OnInit } from '@angular/core';
import { ShareService } from '../services/share.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnInit {
  airportInformation: any;

  //defaulting to dublin coordinates
  latitude: number = 53.4213;
  longitude: number = -6.27007;

  /**
   * Refactored the code to remove the API call here and use the data sent via the data resolver
   */
  constructor(
    public shareService: ShareService,
    private route: ActivatedRoute
  ) {
    this.airportInformation = this.route.snapshot.data['resolvedData'];
  }

  ngOnInit(): void {
    this.loadMap();
  }

  /**
   * Passing the lon and lat  so that the marker is pointed in each of the airport coordinates
   */
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
