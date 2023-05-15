import { AfterViewInit, ElementRef, Component, ViewChild } from '@angular/core';

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

  airportInformation: AirportInformation[] = [];
  flights: any[] = [];

  searchTerm: string = '';

  isLoading: boolean = false;
  midSearch: boolean = false;

  dummyAirportInformation = airportInformation;

  constructor(
    private airportService: AirportService,
    private shareService: ShareService
  ) {}

  /*
   * This lifecycle hook is called after a components view has been initialized
   * Meaning that all the child views and directives are rendered to the DOM
   */
  ngAfterViewInit() {
    this.initSvgMap();
  }

  /*
   * Initialize the map
   * D3 (Data-Driven Documents) is a powerful JavaScript library for visualizing data and creating dynamic, interactive graphics on the web
   */
  initSvgMap() {
    const svg = d3.select(this.svgMap.nativeElement);
    // Loading SVG file
    d3.xml('assets/world.svg').then((data) => {
      svg.html(() => data.documentElement.outerHTML);
    });
  }

  /*
   * Show the loading GIF after user enters search and set the timeout to 2 seconds
   * Once the loading is complete, highlight the countries in the airportInformation [].
   *
   */
  showLoadingSvg(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.highlightCountry();
    }, 2000);
  }

  /*
   * Capturing the search query from the user input using [(ngModel)]
   * Then passing the query to the displayAirports() function
   */
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

  /*
   * Call the airportService which fetches the data from the rapidApi endpoint
   * Call the loading GIF while it fetches the data
   */
  displayAirports(query: string): void {
    this.airportService.getAirportInformation(query).subscribe((data) => {
      this.showLoadingSvg();

      this.airportInformation = data.items;
    });
  }

  /*
   * highlight countries shown on the dropdown search list with the requested color
   * using forEach loop
   */
  highlightCountry(): void {
    const color = '#0083fc';
    const svg = d3.select(this.svgMap.nativeElement);

    this.airportInformation.forEach((airport) => {
      svg.select(`#${airport.countryCode}`).style('fill', color);
    });
  }

  /*
   * Doing the opposite here to the highlightCountry function
   * Setting the fill color to null
   */
  removeHighlights(): void {
    const svg = d3.select(this.svgMap.nativeElement);

    this.airportInformation.forEach((airport) => {
      svg.select(`#${airport.countryCode}`).style('fill', null);
    });
  }

  /*
   * Added a service to share the selected data around the components that would require to use the selected IATA code
   */
  viewAirport(iataCode: string) {
    this.shareService.iataCode = iataCode;
  }
}
