import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ChangePassComponent } from './chance-pass/chance-pass.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'changeInformation', component: ChangePassComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
