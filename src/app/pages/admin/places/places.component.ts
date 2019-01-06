import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlacesService} from "./places.service";
import { circle, geoJSON, icon, latLng, Layer, marker, polygon, tileLayer } from 'leaflet';
import {ToasterService, ToasterConfig} from "angular2-toaster";



@Component({
  selector: 'ngx-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  public form: FormGroup;
  public placesArray = [];

  constructor(
    private placeService: PlacesService,
    private toasterService: ToasterService
  ) {
    this.placeService.getAllPlaces().subscribe(response => {
      this.placesArray = response["response"]
      console.log(response["response"])
    })

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });
  }

  config: ToasterConfig;

  get name() { return this.form.get('name'); }

  ngOnInit() {
  }

  addPlace(input) {
    this.placeService.addPlace(input).subscribe(response => {

      this.toasterService.pop('success', 'Místo přidáno', `Úspěch`);
    }, err => {
      //TODO: alertService
    })
  }
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 8,
    center: latLng(50.76711, 15.054339)
  };

  deleteMatch(id) {
    this.placeService.deletePlace(id).subscribe(next => {
      this.toasterService.popAsync('success', 'Místo odstraněno', 'Místo bylo úspěšně odstraněno')
    }, err => {
      console.log(err);
    })
  }

}
