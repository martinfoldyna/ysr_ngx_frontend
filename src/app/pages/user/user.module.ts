import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRoutingModule} from "./user-routing.module";
import {UserComponent} from "./user.component";
import { ProfileComponent } from './profile/profile.component';
import {ThemeModule} from "../../@theme/theme.module";
import {Ng2SmartTableModule} from "ng2-smart-table";

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    UserRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [
    UserComponent,
    ProfileComponent
  ]
})
export class UserModule { }
