import { Component, OnInit } from '@angular/core';
import { AirportService } from '../services/airport.service';
import { ShareService } from '../services/share.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent implements OnInit {
  flights: any[] = [];
  public flightsSub!: Subscription;

  constructor(
    private airportService: AirportService,
    private shareService: ShareService
  ) {
    // const flightInfo = this.airportService.getAirportDeparturesAndArrivals(
    //   this.iataCode
    // );
    // console.log('Mushy 3:', flightInfo);
  }

  ngOnInit(): void {
    console.log(this.flights);

    // this.airportService
    //   .getAirportDeparturesAndArrivals('DUB')
    //   .subscribe((flights: any) => {
    //     this.flights = flights;
    //     console.log('Mush 12', this.flights);
    //   });
  }
  // departures = [
  //   { time: '13:30', municapilityName: 'AC40x', status: 'Boarding' },
  //   { time: '13:30', municapilityName: 'AC40x', status: 'Boarding' },
  //   { time: '13:30', municapilityName: 'AC40x', status: 'Boarding' },
  //   { time: '13:30', municapilityName: 'AC40x', status: 'Boarding' },
  //   { time: '13:30', municapilityName: 'AC40x', status: 'Boarding' },
  //   { time: '13:30', municapilityName: 'AC40x', status: 'Boarding' },
  // ];

  // arrivals = [
  //   { time: '13:30', municapilityName: 'AC40x', status: 'Boarding' },
  //   { time: '13:30', municapilityName: 'AC40x', status: 'Boarding' },
  //   { time: '13:30', municapilityName: 'AC40x', status: 'Boarding' },
  //   { time: '13:30', municapilityName: 'AC40x', status: 'Boarding' },
  //   { time: '13:30', municapilityName: 'AC40x', status: 'Boarding' },
  //   { time: '13:30', municapilityName: 'AC40x', status: 'Boarding' },

  //   // ...
  // ];

  iataCode: any = 'DUB';
}
