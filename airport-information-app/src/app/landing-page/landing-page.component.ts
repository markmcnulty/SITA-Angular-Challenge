import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { AirportInformation } from '../models/airport-information.model';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AirportService } from '../services/airport.service';
import { filter } from 'rxjs';

// export interface PeriodicElement {
//   iata: string;
//   name: string;
//   countryCode: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  // airportInfo: any;
  // quote: string = '';
  airportInformation: AirportInformation[] = [];

  constructor(
    // private matIconRegistry: MatIconRegistry,
    // private domSanitizer: DomSanitizer,
    private airportService: AirportService // private matList: MatDividerModule
  ) {
    // this.matIconRegistry.addSvgIcon(
    //   `world`,
    //   this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/world.svg')
    // );
  }

  ngOnInit(): void {
    // console.log('Hello');
    // this.displayAirportInformation('KSFO'); // Replace with desired ICAO code
    // this.displayAirportInformationByFreeText('orl'); // Replace with desired ICAO code
  }

  // displayAirportInformation(icaoCode: string): void {
  //   console.log('hello 2');

  //   this.airportService
  //     .getAirportInformationByICAO(icaoCode)
  //     .subscribe((data) => {
  //       this.airportInfo = data;
  //       console.log('hello 3');

  //       console.log(this.airportInfo);
  //     });
  // }

  displayAirportInformationByFreeText(query: string): void {
    this.airportService.getAirportInformation(query).subscribe((data) => {
      // this.airportInfo = data;
      this.airportInformation = data.items;
      // console.log(this.airportInfo);

      // this.airportInfo.items.forEach(
      //   (element: { iata: string; name: string; countryCode: string }) => {
      //     // const ELEMENT_DATA: PeriodicElement[] = [
      //     //   { position: 1, iata: 'Hydrogen', weight: 1.0079, symbol: 'H' },
      //     //   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
      //     //   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
      //     //   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
      //     //   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
      //     //   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
      //     //   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
      //     //   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
      //     //   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
      //     //   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
      //     // ];
      //     const ELEMENT_DATA: AirportInformation[] = [
      //       {
      //         iata: element.iata,
      //         name: element.name,
      //         countryCode: element.countryCode,
      //       },
      //     ];
      //     // this.airportInformation = ELEMENT_DATA;
      //     // console.log(ELEMENT_DATA);
      //   }
      // );
    });
  }

  searchTerm = '';
  filter = '';
  onInputChange(): void {
    console.log('searchTerm: ', this.searchTerm);
    if (this.searchTerm.length >= 3) {
      this.displayAirportInformationByFreeText(this.searchTerm);
    }
  }

  // displayedColumns: string[] = ['iata', 'name', 'countryCode'];

  // olddisplayedColumns: string[] = ['demo-name', 'demo-weight', 'demo-symbol'];
  // dataSource = new MatTableDataSource<AirportInformation>(
  //   this.airportInformation
  // );

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  // dataSource = ELEMENT_DATA;
}
