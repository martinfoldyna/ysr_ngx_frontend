import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {getUrl} from "../../@core/config/endpoints.config";
import {IUser} from "../../@core/models/user.interface";
import {IRegistrationCredentials} from "../../@core/models/credentials.interface";

@Injectable({
  providedIn: 'root'
})
export class AdminUserManagementService {

  constructor(private http: HttpClient) { }

  listUsers(): Observable<any> {
    return this.http.get<any>(`${getUrl( 'operator','ADMIN')}/read/users`);
  }

  getUser(id): Observable<any> {
    return this.http.get<any>(`${getUrl('operator','ADMIN')}/read/users/${id}`);
  }

  updateUser(id, input): Observable<any> {
    return this.http.post<any>(`${getUrl('operator','USR_UPDATE')}/${id}`, input);
  }

  getUserData(id): Observable<any> {
    return this.http.get<any>(`${getUrl('operator','USR_DATA')}/${id}`);
  }


  createUser(user: IRegistrationCredentials, options): Observable<any> {
    const body = { user: user, options: options };
    return this.http.post<IRegistrationCredentials>(`${getUrl('operator','ADMIN')}/create/users`, body);
  }

}
