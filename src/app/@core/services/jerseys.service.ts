import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IMatch} from "../models/match.interface";
import {Observable} from "rxjs";
import {IResponse} from "../models/response.interface";

@Injectable({
  providedIn: 'root'
})
export class JerseysService {
  constructor(private http: HttpClient) {}

  getAllJersey(): Observable<IResponse> {
    return this.http.get<IResponse>('http://localhost:4000/api/core/jerseys/get-all');
  }
  addJersey(input) {
    return this.http.post('http://localhost:4000/api/core/jerseys', {input})
  }

  deleteJersey(jerseyID) {
    return this.http.delete(`http://localhost:4000/api/core/jerseys/${jerseyID}`)
  }
}
