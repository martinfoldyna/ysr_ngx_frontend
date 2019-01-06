import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AlertsService } from "../@core/services/alerts/alerts.service";
import { DialogsService } from "../@core/services/dialogs/dialogs.service";
import { PreviousRouteService } from "../@core/services/previous-route.service";
import {PreventLogged, RoleCheck} from "../@core/services/auth.guard";
import { AuthGuard } from "../@core/services/auth.guard";
import { RoleGuard } from "../@core/services/auth.guard";
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRouting } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {ToasterModule} from "angular2-toaster";
import {LoginComponent} from "./auth/login/login.component";
import {AlertsComponent} from "../@core/services/alerts/alerts.component";
import {DialogsComponent} from "../@core/services/dialogs/dialogs.component";
import {NotFoundComponent} from "./miscellaneous/not-found/not-found.component";
import {LogoutComponent} from "./auth/logout/logout.component";
import { MatchesComponent } from './matches/matches.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import { MatchesResultsComponent } from './matches/matches-results/matches-results.component';
import { MomentModule } from "angular2-moment";
import { JerseysService } from "../@core/services/jerseys.service";
import {UserModule} from "./user/user.module";
import { RegisterComponent } from './auth/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpHeadersInterceptor} from "../@core/services/http.interceptor";
import {AuthModule} from "./auth/auth.module";
import { TrainingsComponent } from './trainings/trainings.component';

const PAGES_COMPONENTS = [
  AlertsComponent, DialogsComponent, PagesComponent
];

@NgModule({
  imports: [
    PagesRouting,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    ToasterModule.forRoot(),
    Ng2SmartTableModule,
    MomentModule,
    UserModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    MatchesComponent,
    MatchesResultsComponent,
    TrainingsComponent,
  ],
  providers: [
    AlertsService,
    DialogsService,
    PreviousRouteService,
    JerseysService,

    [PreventLogged],
    [AuthGuard],
    [RoleGuard],
    { provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true
    }
  ]
})
export class PagesModule {
}
