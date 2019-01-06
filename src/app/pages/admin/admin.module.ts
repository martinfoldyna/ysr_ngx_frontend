import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminUserManagementService} from "./user-management.service";
import {AdminComponent} from "./admin.component";
import {RoleGuard} from "../../@core/services/auth.guard";
import {RouterModule} from "@angular/router";
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';
import {AdminRouting} from "./admin-routing.module";
import {ThemeModule} from "../../@theme/theme.module";
import {SmartTableService} from "../../@core/data/smart-table.service";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { JerseyComponent } from './jersey/jersey.component';
import { PlacesComponent } from './places/places.component';
import {PlacesService} from "./places/places.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpHeadersInterceptor} from "../../@core/services/http.interceptor";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {ToasterModule} from "angular2-toaster";
import { MatchesComponent } from './matches/matches.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AdminRouting,
    RouterModule,
    Ng2SmartTableModule,
    LeafletModule,
    ToasterModule.forRoot()
  ],
  declarations: [
    AdminComponent,
    RegistrationRequestsComponent,
    JerseyComponent,
    PlacesComponent,
    MatchesComponent
  ],
  providers: [
    AdminUserManagementService,
    PlacesService,
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true
    }
  ]
})
export class AdminModule { }
