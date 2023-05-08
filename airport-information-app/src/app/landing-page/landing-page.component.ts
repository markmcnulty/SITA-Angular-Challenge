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
import fullAirportInfo from '../../assets/full-airport-information.json';

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

  // id: string = '';
  // color: string = '';
  searchTerm: string = '';
  // allData: any[] = [];

  isLoading: boolean = false;
  fullAirportInfo = fullAirportInfo;

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

      // Place the code you want to execute after 2 seconds here or call a function
      this.highlightCountry();
    }, 2000);
  }

  onInputChange(): void {
    console.log('searchTerm: ', this.searchTerm);
    if (this.searchTerm.length >= 3) {
      this.displayAirports(this.searchTerm);
    }
  }

  //Get airport information and display it
  async displayAirports(query: string): Promise<void> {
    (await this.airportService.getAirportInformation(query)).subscribe(
      (data) => {
        this.showLoadingSvg();

        this.airportInformation = data.items;
        console.log(this.airportInformation);
      }
    );
  }

  highlightCountry() {
    const color = '#0083fc';
    const svg = d3.select(this.svgMap.nativeElement);

    this.airportInformation.forEach((element) => {
      console.log(element.countryCode);
      svg.select(`#${element.countryCode}`).style('fill', color);
    });
  }

  async getDepartureInfo(iataCode: string): Promise<void> {
    (
      await this.airportService.getAirportDeparturesAndArrivals(iataCode)
    ).subscribe((data) => {
      this.flights = data;
      const allData = [this.airportInformation, this.flights];
      console.log('Mush1:', this.airportInformation);

      console.log('Mush2', this.flights);
    });
  }

  viewAirport(iataCode: string) {
    console.log('Hello', iataCode);

    this.shareService.myData = iataCode;
  }
}
