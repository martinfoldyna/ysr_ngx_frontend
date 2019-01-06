import { Component, OnInit } from '@angular/core';
import {JerseysService} from "../../../@core/services/jerseys.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-jersey',
  templateUrl: './jersey.component.html',
  styleUrls: ['./jersey.component.scss']
})
export class JerseyComponent implements OnInit {

  public jerseyArray = [];
  public form: FormGroup;

  constructor(
    private jerseyService: JerseysService
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
    });
  }

  get name() { return this.form.get('name'); }
  get value() { return this.form.get('value'); }

  ngOnInit() {
    this.jerseyService.getAllJersey().subscribe(response => {
      this.jerseyArray = response["response"];
      console.log(response);
    })
  }

  addJersey(input) {
    let name = input["name"];
    let value = input["value"];
    name = name.substr(0, 1).toUpperCase() + name.substr(1);
    value = value.toLowerCase();
    const reqBody = {
      name: name,
      color: value
    };
    this.jerseyService.addJersey(reqBody).subscribe(response => {
      console.log(response);
    })
  }

  deleteJersey(jerseyId) {
    this.jerseyService.deleteJersey(jerseyId).subscribe(response =>{
      console.log(response);
    })
  }

}
