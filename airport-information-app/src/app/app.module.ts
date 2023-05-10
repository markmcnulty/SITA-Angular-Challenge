import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

import { AirportDetailsComponent } from './airport-details/airport-details.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AirportSearchComponent } from './airport-search/airport-search.component';

import { AirportService } from './services/airport.service';
import { ShareService } from './services/share.service';

import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { FlightsComponent } from './flights/flights.component';
import { LoadingSvgComponent } from './loading-svg/loading-svg.component';
import { SafePipe } from 'src/safe.pipe';

@NgModule({
  declarations: [
    AirportDetailsComponent,
    AppComponent,
    HeaderComponent,
    AirportSearchComponent,
    GoogleMapsComponent,
    FlightsComponent,
    LoadingSvgComponent,
    SafePipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
  providers: [AirportService, ShareService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
