import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MyHotelsComponent } from './hotels/my-hotels/my-hotels.component';
import { GetReservationsComponent } from './reservation/get-reservations/get-reservations.component';
import { AddRoomComponent } from './room/add-room/add-room.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {path:'myHotels', component:MyHotelsComponent},
  {path:'myHotels/Rezervations/:id', component:GetReservationsComponent },
  {path:'addRoom', component:AddRoomComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
