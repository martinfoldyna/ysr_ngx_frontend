import { Component } from '@angular/core';
import {UserService} from "./user/user.service";

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  constructor(
    private userService: UserService,
  ) {

  }

  menuItems = [{
    title: 'Závody',
    icon: 'nb-compose',
    children: [
      {
        title: 'Závody',
        link: '/pages/matches'
      },
      {
        title: 'Zapisování výsledků',
        link: '/pages/matches-results'
      }],
    }, {
    title: 'Tréninky',
    icon: 'nb-compose',
    link: '/pages/trainings'
    },{
    title: 'Admin',
    icon: 'nb-gear',
    hidden: !this.userService.isAdmin(),
    children: [
      {
        title: 'Uživatelé',
        link: '/pages/admin/registration-requests',
      },
      {
        title: 'Místa',
        link: '/pages/admin/places',
      }
    ]
  }, {
      title: 'User',
      link: '/pages/user/profile',
      icon: 'nb-person'
  }];
}
