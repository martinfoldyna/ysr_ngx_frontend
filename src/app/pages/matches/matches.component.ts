import { Component, OnInit } from '@angular/core';
import {RoleCheck} from "../../@core/services/auth.guard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatchesService} from "./matches.service";
import {ErrorHelper} from "../../@core/helpers/error.helper";
import { SelectControlValueAccessor } from '@angular/forms';
import {PlacesService} from "../admin/places/places.service";


@Component({
  selector: 'ngx-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean = false;
  public matchArray = [];
  public placeArray = [];

  constructor(
    private matchesService: MatchesService,
    private placesService: PlacesService,
    private errorHelper: ErrorHelper

  ) {

    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      place: new FormControl(null, [Validators.required]),
      note: new FormControl(null, [Validators.required])
    });

    this.matchesService.getAllMatchesRequest().subscribe(matches => {
      this.matchArray = matches["response"];
    }, err => {
      this.errorHelper.handleGenericError(err);
    });

    this.placesService.getAllPlaces().subscribe(response => {
      this.placeArray = response["response"];
    }, err => {
      this.errorHelper.handleGenericError(err);
    })

  }

  get title() { return this.form.get('title'); }
  get date() { return this.form.get('date'); }
  get place() { return this.form.get('place'); }
  get note() { return this.form.get('note'); }


  ngOnInit() {
  }

  addMatch(value) {
    if (!this.form.valid) {
      this.title.markAsTouched();
      this.date.markAsTouched();
      this.place.markAsTouched();
      this.note.markAsTouched();
    } else {
      if (!this.submitted) {
        this.callAddMatchSvc(value);
        this.submitted = true;
      }
    }
  }

  callAddMatchSvc(input) {
    this.matchesService.addMatchRequest(input).subscribe(response => {
      console.log(response);
    }, err => {
      this.errorHelper.handleGenericError(err);
    })
  }

  matchParticipation(willParticipate, matchId) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    // console.log(matchId);
    // const user = this.roleCheck.getUserInfo();
    const requestBody = {
      participation: willParticipate,
      userName: user["name"],
      userID: user["_id"],
    };
    this.matchesService.participationInMatchRequest(requestBody, matchId).subscribe( response => {
      console.log(response);
    }, err => {
      this.errorHelper.handleGenericError(err);
    } )
  }

  isUserEnrolled(enrolledPlayers) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (enrolledPlayers.indexOf(user._id) >= 0) {
      return true;
    } else {
      return false;
    }
  }

}
