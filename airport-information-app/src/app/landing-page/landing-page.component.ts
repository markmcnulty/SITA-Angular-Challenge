import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AirportService } from '../services/airport.service';

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

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  airportInfo: any;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private airportService: AirportService
  ) {
    this.matIconRegistry.addSvgIcon(
      `world`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/world.svg')
    );
  }

  ngOnInit(): void {
    console.log('Hello');
    this.displayAirportInformation('KSFO'); // Replace with desired ICAO code
  }

  displayAirportInformation(icaoCode: string): void {
    console.log('hello 2');

    this.airportService.getAirportInformation(icaoCode).subscribe((data) => {
      this.airportInfo = data;
      console.log('hello 3');

      console.log(this.airportInfo);
    });
  }

  searchTerm = '';
  displayedColumns: string[] = [
    'demo-position',
    'demo-name',
    'demo-weight',
    'demo-symbol',
  ];
  dataSource = ELEMENT_DATA;
}
