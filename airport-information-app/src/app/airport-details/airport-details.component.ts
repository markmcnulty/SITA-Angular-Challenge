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

import { GoogleMapsComponent } from '../google-maps/google-maps.component';
// import { SvgMapComponent } from '../svg-map/svg-map.component';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  id: number;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

export interface ActualPeriodicElement {
  position: number;
  time: string;
  number: string;
  status: string;
}

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css'],
})
export class AirportDetailsComponent implements OnInit {
  // flights: any[] = [];
  airportDepartureInformation: any[] = [];
  airportArrivalInformation: any[] = [];

  constructor(
    private airportService: AirportService,
    public shareService: ShareService
  ) {}

  tiles: Tile[] = [
    { id: 1, cols: 1, rows: 2, color: 'lightblue' },
    { id: 2, cols: 1, rows: 1, color: 'lightgreen' },
    { id: 3, cols: 1, rows: 1, color: '#DDBDF1' },
  ];

  ngOnInit(): void {
    console.log('MYDATA- Airport details', this.shareService.myData);
    // this.getDepartureInfo(this.shareService.myData);
  }

  async getDepartureInfo(iataCode: string) {
    (
      await this.airportService.getAirportDeparturesAndArrivals(iataCode)
    ).subscribe((data) => {
      console.log('mushy2');

      this.airportDepartureInformation = data.departures;
      this.airportArrivalInformation = data.arrivals;
      // console.log(this.airportDepartureInformation);
      // console.log(this.airportArrivalInformation);
      this.prepareDepartureData();
      // return data;
    });
  }

  ACTUAL_ELEMENT_DATA: ActualPeriodicElement[] = [
    { position: 1, time: 'Hydrogen', number: '1.0079', status: 'H' },
    { position: 2, time: 'Helium', number: '4.0026', status: 'He' },
    { position: 3, time: 'Lithium', number: '6.941', status: 'Li' },
    { position: 4, time: 'Beryllium', number: '9.0122', status: 'Be' },
    { position: 5, time: 'Boron', number: '10.811', status: 'B' },
    { position: 6, time: 'Carbon', number: '12.0107', status: 'C' },
    { position: 7, time: 'Nitrogen', number: '14.0067', status: 'N' },
    { position: 8, time: 'Oxygen', number: '15.9994', status: 'O' },
    { position: 9, time: 'Fluorine', number: '18.9984', status: 'F' },
    { position: 10, time: 'Neon', number: '20.1797', status: 'Ne' },
  ];

  prepareDepartureData() {
    if (this.airportDepartureInformation.length > 0) {
      console.log('Mushy 1');
      console.log(this.airportDepartureInformation);

      return this.airportDepartureInformation;
    }
    return;
  }
  // depD = this.prepareDepartureData();

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  actualDisplayedColumns: string[] = ['position', 'time', 'number', 'status'];
  dataSource = ELEMENT_DATA;
  actualDataSource = this.ACTUAL_ELEMENT_DATA;
}
function prepareDepartureData() {
  throw new Error('Function not implemented.');
}
