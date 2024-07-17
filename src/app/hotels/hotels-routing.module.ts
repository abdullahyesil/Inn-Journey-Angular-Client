import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './hotels.component';
import { HotelComponent } from './hotel/hotel.component';

const routes: Routes = [
  { path: "", component: HotelsComponent },
  { path: "rentRoom/:id", component:HotelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelsRoutingModule { }
