import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import {MatchesService} from "../../matches/matches.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AdminUserManagementService} from "../../admin/user-management.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocalDataSource} from "ng2-smart-table";

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userData;
  public form: FormGroup;
  public showForm: boolean = false;
  public playedMacthesArray = [];
  public userBack;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private userService: UserService,
    private matchesService: MatchesService,
    private modalService: NgbModal,
    private userManagementService: AdminUserManagementService,
  ) {
    this.userData = this.userService.getUserData();
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required])
    });
    /*
    * userBack is created to get all informations about user so he can see them in the profile overview and so we don't
    * have to have all the data in session storage
    */
    // this.userManagementService.getUserData(this.userData["_id"]).subscribe(response => {
    //   this.userBack = response["response"];
    //   console.log(this.userBack);
    // });

    this.matchesService.getPlayedMatches(this.userData["_id"]).subscribe(response => {
      let tableBody = [];
      response = response[0];
      // console.log(response[0]["afterMatch"])
      const afterMatch = response["afterMatch"];
      afterMatch.forEach((result) => {
        console.log(result["player"]);
        console.log(this.userData["_id"]);
        if (result["player"] == this.userData["_id"]){
          tableBody.push({
            title: response["title"],
            date: response.date,
            place: response.place,
            result: result["status"],
            jersey: result["jersey"]
          })
        }
      })

      console.log(tableBody);
      this.source.load(tableBody);
    });


  }

  get name() { return this.form.get('name'); }
  get username() { return this.form.get('username'); }
  get number() { return this.form.get('number'); }

  ngOnInit() {

  }

  settings = {
    noDataMessage: "Zatím jste neodehrál žádné zápasy",
    pager: true,
    actions: false,
    columns: {
      title: {
        title: 'Název',
        type: 'string',
      },
      date: {
        title: 'Datum',
        type: 'string',
      },
      place: {
        title: 'Místo zápasu',
        type: 'string',
      },
      result: {
        title: 'Výsledek',
        type: 'string',
      },
      jersey: {
        title: 'Dres',
        type: 'string',
      }
    },
  };

  updateUser(formValue) {
      this.userManagementService.updateUser(this.userData["_id"], formValue).subscribe( response => {
        console.log(response)
        //TODO: Notifikace
        sessionStorage.clear();
        window.location.reload();
      }, err => {
        console.log(err);
      })
  }

  onUserRowSelect(event): void {
    console.log(event);
  }


}
