import {Injectable} from "@angular/core";
import {UserRoles} from "../../@core/enums/user.enum";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user = JSON.parse(sessionStorage.getItem('user'));

  constructor() {
  }

  getCurrentUser(attr?: string) {
    return !!attr ? JSON.parse(localStorage.getItem('user'))[attr] : JSON.parse(localStorage.getItem('user')) || false;
  }

  isAdmin() {
    return !!this.user ? this.user.roles.some(role => role.indexOf(UserRoles.admin) >= 0) : false;
  }

  getUserData() {
    return this.user;
  }
}
