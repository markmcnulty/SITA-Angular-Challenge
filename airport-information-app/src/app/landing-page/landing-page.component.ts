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
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements AfterViewInit {
  @ViewChild('svgMap') private svgMap!: ElementRef;
  @ViewChild('airport') private airport!: ElementRef;

  @Output() childToParent = new EventEmitter<String>();

  airportInformation: AirportInformation[] = [];
  flights: any[] = [];

  searchTerm: string = '';

  isLoading: boolean = false;
  retreivedItems: boolean = false;

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
      this.retreivedItems = true;
      // Place the code you want to execute after 2 seconds here or call a function
      this.highlightCountry();
    }, 2000);
  }

  // Capturing the data from the user input and getting back sufficent airport data
  onInputChange(): void {
    if (this.searchTerm.length >= 3) {
      // this.initSvgMap();
      this.displayAirports(this.searchTerm);
    }
  }

  //Get airport information and display it
  // Comment out as using dummy departure data moving forward
  async displayAirports(query: string): Promise<void> {
    (await this.airportService.getAirportInformation(query)).subscribe(
      (data) => {
        this.showLoadingSvg();

        this.airportInformation = data.items;
      }
    );
  }

  // highlight countries shown on the dropdown search list
  // TODO - remove country color styling when user clears the search.
  highlightCountry() {
    const color = '#0083fc';
    const svg = d3.select(this.svgMap.nativeElement);

    this.airportInformation.forEach((element) => {
      svg.select(`#${element.countryCode}`).style('fill', color);
    });
  }

  // Comment out as using dummy departure data moving forward
  // async getDepartureInfo(iataCode: string): Promise<void> {
  //   (
  //     await this.airportService.getAirportDeparturesAndArrivals(iataCode)
  //   ).subscribe((data) => {
  //     this.flights = data;
  //   });
  // }

  // Passing this data to view 2 so that the map will load depending on the iata code
  // I was using this iata code to determine the full view 2 layout
  // I was capturing the iata code depending on which airport the user clicked from the search results
  viewAirport(iataCode: string) {
    this.shareService.sharedIataCode = iataCode;
  }
}
