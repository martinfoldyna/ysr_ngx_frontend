import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IMatch } from "../../@core/models/match.interface";
import { IResponse } from "../../@core/models/response.interface";
import {getUrl} from "../../@core/config/endpoints.config";

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) { }

  addMatchRequest(matches: IMatch): Observable<IResponse> {
    return this.http.post<IResponse>('http://localhost:4000/api/core/matches', matches);
  }

  getAllMatchesRequest(): Observable<IResponse> {
    return this.http.post<IResponse>('http://localhost:4000/api/core/matches/get-all', {})
  }

  participationInMatchRequest(requestBody, id): Observable<IResponse> {
    return this.http.post<IResponse>(`http://localhost:4000/api/core/matches/participation/${id}`, requestBody)
  }

  writeMatchResultsRequest(input, id): Observable<IResponse> {
    return this.http.post<IResponse>(`http://localhost:4000/api/core/matches/write-results/${id}`, input)
  }

  getAllPlaces(): Observable<IResponse> {
    return this.http.get<IResponse>('http://localhost:4000/api/core/places-all')
  }

  getPlayedMatches(id): Observable<any> {
    return this.http.get<any>(`http://localhost:4000/api/core/matches/user-played-matches/${id}`);
  }

}
