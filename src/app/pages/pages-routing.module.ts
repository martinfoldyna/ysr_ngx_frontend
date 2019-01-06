import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {MatchesComponent} from "./matches/matches.component";
import {MatchesResultsComponent} from "./matches/matches-results/matches-results.component";
import {MiscellaneousModule} from "./miscellaneous/miscellaneous.module";
import {AdminModule} from "./admin/admin.module";
import {RoleGuard} from "../@core/services/auth.guard";
import {UserModule} from "./user/user.module";
import {TrainingsComponent} from "./trainings/trainings.component";


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
      path: 'matches',
      component: MatchesComponent,
    }, {
      path: 'matches-results',
      component: MatchesResultsComponent,
    }, {
      path: 'trainings',
      component: TrainingsComponent,
    }, {
      path: 'miscellaneous',
      loadChildren: () => MiscellaneousModule,
    }, {
      path: 'admin',
      loadChildren: () => AdminModule
    }, {
      path: 'user',
      loadChildren: () => UserModule
  }]
  },
  {
      path: '',
      redirectTo: 'matches',
      pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRouting {
}
