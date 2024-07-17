import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddRoomComponent } from './room/add-room/add-room.component';
import { AddRoomTypeComponent } from './add-room-type/add-room-type.component';
import { GetReservationsComponent } from './reservation/get-reservations/get-reservations.component';
import { MyHotelsComponent } from './hotels/my-hotels/my-hotels.component';
import {MatTableModule} from '@angular/material/table';
import { EditHotelComponent } from './hotels/edit-hotel/edit-hotel.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AdminComponent,
    AddRoomComponent,
    AddRoomTypeComponent,
    GetReservationsComponent,
    MyHotelsComponent,
    EditHotelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatOption,
    MatSelectModule
  ]
})
export class AdminModule { }
