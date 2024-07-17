import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path:'', redirectTo:'', pathMatch:'full'},
  {path:'', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'login', component:AuthComponent},
  { path: 'hotels', loadChildren: () => import('./hotels/hotels.module').then(m => m.HotelsModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'hotels/admin', loadChildren: () => import('./hotels/admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
