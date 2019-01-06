import { CommonModule } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { MatchesService } from "../matches.service";
import {ErrorHelper} from "../../../@core/helpers/error.helper";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {JerseysService} from "../../../@core/services/jerseys.service";

@Component({
  selector: 'ngx-matches-results',
  templateUrl: './matches-results.component.html',
  styleUrls: ['./matches-results.component.scss']
})
export class MatchesResultsComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean = false;
  public matchArray = [];
  public jerseyArray = [];

  constructor(
    private  matchesService: MatchesService,
    private errorHelper: ErrorHelper,
    private jerseyService: JerseysService
  ) {

    this.form = new FormGroup({
      result: new FormControl(null, [Validators.required]),
      jersey: new FormControl(null, [Validators.required]),

    });

    this.matchesService.getAllMatchesRequest().subscribe(matches => {
      this.matchArray = matches["response"];
    }, err => {
      this.errorHelper.handleGenericError(err);
    });

  }

  get jersey() { return this.form.get('jersey'); }
  get result() { return this.form.get('result'); }


  ngOnInit() {
    this.jerseyService.getAllJersey().subscribe(response => {
      this.jerseyArray = response["response"];
      console.log(this.jerseyArray)
    }, err => {
      console.log(err);
    })
  }

  onSubmit(value, matchID) {
    if (!this.form.valid) {
      this.jersey.markAsTouched();
      this.result.markAsTouched();
    } else {
      if (!this.submitted) {

        const matchInfo = {
            players: {
              jersey: value["jersey"],
              status: value["result"]
            }
        };
        const requestBody = {
          value: value,
          match: matchInfo
        };
        this.callWriteMatchResultsSvc(requestBody, matchID);
        this.submitted = true;
      }
    }
  }

  callWriteMatchResultsSvc(requestBody, matchID) {
    this.matchesService.writeMatchResultsRequest(requestBody, matchID).subscribe(response => {
      console.log(response);
    }, err => {
      this.errorHelper.handleGenericError(err);
    })
  }

}
