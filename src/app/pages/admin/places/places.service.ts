import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IPlace} from "../../../@core/models/place.interface";
import {Observable} from "rxjs";
import {IResponse} from "../../../@core/models/response.interface";
import {getUrl} from "../../../@core/config/endpoints.config";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  constructor(private http: HttpClient) {}

  getAllPlaces(): Observable<IResponse> {
    return this.http.get<IResponse>(`http://localhost:4000/api/core/places/get-all`);
  }

  addPlace(input): Observable<IResponse> {
    return this.http.post<IResponse>('http://localhost:4000/api/core/places', {input})
  }

  deletePlace(id) {
    return this.http.delete(`http://localhost:4000/api/core/places/${id}`)
  }


}
