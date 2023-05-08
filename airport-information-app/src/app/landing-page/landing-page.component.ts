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

  id: string = '';
  color: string = '';
  searchTerm: string = '';

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

  highlightCountry(countryId: string, color: string) {
    const svg = d3.select(this.svgMap.nativeElement);
    svg.select(`#${countryId}`).style('fill', color);
  }

  showCountry(id: string, color: string) {
    this.highlightCountry(id, color);
  }

  async displayAirports(query: string): Promise<void> {
    (await this.airportService.getAirportInformation(query)).subscribe(
      (data) => {
        this.airportInformation = data.items;
      }
    );
  }

  onInputChange(): void {
    console.log('searchTerm: ', this.searchTerm);
    if (this.searchTerm.length >= 3) {
      this.displayAirports(this.searchTerm);
    }
  }

  colorMap(countryCode: string) {
    this.showCountry(countryCode, 'blue');
  }

  async getDepartureInfo(iataCode: string): Promise<void> {
    (
      await this.airportService.getAirportDeparturesAndArrivals(iataCode)
    ).subscribe((data) => {
      this.flights = data;
      console.log(this.flights);
    });
  }

  viewAirport(iataCode: string) {
    // this.getDepartureInfo(iataCode);
    this.shareService.myData = this.getDepartureInfo(iataCode);
  }
}
