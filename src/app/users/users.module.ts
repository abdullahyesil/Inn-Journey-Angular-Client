import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePassComponent } from './chance-pass/chance-pass.component';


@NgModule({
  declarations: [
    UsersComponent,
    MyReservationsComponent,
    SidebarComponent,
    ChangePassComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UsersModule { }