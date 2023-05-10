import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirportSearchComponent } from './airport-search/airport-search.component';
import { AirportDetailsComponent } from './airport-details/airport-details.component';
import { DataResolver } from './services/data-resolver.service';

const routes: Routes = [
  { path: '', component: AirportSearchComponent },
  {
    path: 'airport',
    component: AirportDetailsComponent,
    resolve: {
      data: DataResolver,
    },
  },

  { path: '**', redirectTo: 'search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
