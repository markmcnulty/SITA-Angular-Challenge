import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AirportDetailsComponent } from './airport-details/airport-details.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  // { path: 'airport/:iata', component: AirportDetailsComponent },
  { path: 'airport', component: AirportDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
