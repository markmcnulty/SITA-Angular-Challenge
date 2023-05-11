import {
  AfterViewInit,
  ElementRef,
  Component,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';

import { AirportInformation } from '../models/airport-information.model';

import { AirportService } from '../services/airport.service';

import * as d3 from 'd3';
import { ShareService } from '../services/share.service';
import airportInformation from '../../assets/mock-data/full-airport-information.json';

@Component({
  selector: 'app-airport-search',
  templateUrl: './airport-search.component.html',
  styleUrls: ['./airport-search.component.css'],
})
export class AirportSearchComponent implements AfterViewInit {
  @ViewChild('svgMap') private svgMap!: ElementRef;
  @ViewChild('airport') private airport!: ElementRef;

  @Output() childToParent = new EventEmitter<String>();

  airportInformation: AirportInformation[] = [];
  flights: any[] = [];

  searchTerm: string = '';

  isLoading: boolean = false;
  midSearch: boolean = false;
  // retreivedItems: boolean = false;

  dummyAirportInformation = airportInformation;

  constructor(
    private airportService: AirportService,
    private shareService: ShareService
  ) {}

  ngAfterViewInit() {
    this.initSvgMap();
  }

  initSvgMap() {
    const svg = d3.select(this.svgMap.nativeElement);

    // Loading SVG file
    d3.xml('assets/world.svg').then((data) => {
      svg.html(() => data.documentElement.outerHTML);
    });
  }

  showLoadingSvg() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.highlightCountry();
    }, 2000);
  }

  // Capturing the data from the user input and getting back sufficent airport data
  onInputChange(): void {
    if (this.searchTerm.length == 0) {
      this.midSearch = false;
      this.removeHighlights();
    } else if (this.searchTerm.length >= 3) {
      this.midSearch = true;
      this.removeHighlights();
      this.displayAirports(this.searchTerm);
    }
  }

  //Get airport information and display it
  // Comment out as using dummy departure data moving forward
  displayAirports(query: string) {
    this.airportService.getAirportInformation(query).subscribe((data) => {
      this.showLoadingSvg();

      this.airportInformation = data.items;
    });
  }

  // highlight countries shown on the dropdown search list
  highlightCountry() {
    const color = '#0083fc';
    const svg = d3.select(this.svgMap.nativeElement);

    this.airportInformation.forEach((airport) => {
      svg.select(`#${airport.countryCode}`).style('fill', color);
    });
  }

  removeHighlights() {
    const svg = d3.select(this.svgMap.nativeElement);

    this.airportInformation.forEach((airport) => {
      svg.select(`#${airport.countryCode}`).style('fill', null);
    });
  }

  getAirportSelectedData() {
    return this.airportService
      .getAirportInformationByIATA(this.shareService.iataCode)
      .subscribe((data) => {
        return data;
      });
  }

  viewAirport(iataCode: string) {
    this.shareService.iataCode = iataCode;
  }
}
