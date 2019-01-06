import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import {RegistrationRequestsComponent} from "./registration-requests/registration-requests.component";
import {JerseyComponent} from "./jersey/jersey.component";
import {PlacesComponent} from "./places/places.component";


const routes: Routes = [
  {
    path: 'matches',
    component: AdminComponent,
  },
  {
      path: 'registration-requests',
      component: RegistrationRequestsComponent
  },
  {
    path: 'jersey',
    component: JerseyComponent
  },
  {
    path: 'places',
    component: PlacesComponent
  }, {
    path: '',
    redirectTo: 'pages'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting { }
