import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {SmartTableService} from "../../../@core/data/smart-table.service";
import {RequestsService} from "../requests.service";
import {ErrorHelper} from "../../../@core/helpers/error.helper";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.scss']
})
export class RegistrationRequestsComponent implements OnInit {

  public openForm: boolean = false;
  public formInviteOne: FormGroup;
  public formInviteMore: FormGroup;
  public multipleInvitesConst: boolean;
  public invitesArray = [];

  constructor(
    private service: SmartTableService,
    private requestsService: RequestsService,
    private errorHelper: ErrorHelper
  ) {
    // const data = this.service.getData();
    // this.source.load(data);

    this.formInviteOne = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
    });
    this.formInviteMore = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
    });

    this.requestsService.getAllRequests().subscribe(requests => {
      const data = requests["response"];
      const requestsArray = [];

      for (var i = 0; i < data.length; i++) {
        if(!data[i]["approval"]["approved"]){
          requestsArray.push(data[i]);
        }
      }

      setTimeout(() => {
        console.log(requestsArray);
        this.source.load(requestsArray);
        }, 1000);
    }, err => {
      this.errorHelper.handleGenericError(err);
    });
  }

  get oneEmail() { return this.formInviteOne.get('email'); }
  get oneName() { return this.formInviteOne.get('name'); }
  get moreEmail() { return this.formInviteMore.get('email'); }
  get moreName() { return this.formInviteMore.get('name'); }

  ngOnInit() {
  }

  settings = {
    noDataMessage: "Nebyla přidána žádná nová žádost o schválení",
    pager: true,
    actions: {
      delete: false,
      edit: false,
      add: false,
      custom: [
        {
          name: 'confirm',
          title: '<i class="nb-checkmark"></i>',
        }
      ],

    },
    columns: {
      name: {
        title: 'Jméno',
        type: 'string',
        editable: false,
      },
      email: {
        title: 'E-mail',
        type: 'string',
        editable: false,
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  onCustom(event) {
    if (event.action === 'confirm') {
      console.log(event);
      this.requestsService.requestAprroval({state: true, id: event.data._id}).subscribe(response => {
        console.log(response)
        window.location.reload();
      }, err => {
        console.log(err);
      });
    } else {
      this.errorHelper.handleGenericError(401);
    }
  }

  sendInvite(input) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    const requestBody = {
      email: input["email"],
      name: input["name"],
      invited: true
    };
    if (!this.formInviteOne.valid) {
      this.oneEmail.markAsTouched();
    } else {
      this.sendEmailInvitations(requestBody);
      this.formInviteOne.reset();
    }
  }

  sendEmailInvitations(emails) {

    this.requestsService.sendInvitations(emails).subscribe(response => {
      console.log('Got response');

      if (response.response.success && response.sent.length !== 0) {
        const total = Array.isArray(emails.emails) ? emails.emails.length : 1;
      //   if (response.sent.length !== total) {
      //     this.alertsService.alertWarning({
      //       title: 'Invitations sent',
      //       body: `We were able to send only ${response.sent.length} out of ${total} invitation emails. <br><b>Failure emails:</b><br> ${response.unsent.join(',<br>')}`
      //     }, 5000);
      //     this.loadRequests();
      //   } else {
      //     this.alertsService.alertSuccess({
      //       title: 'Invitations sent!',
      //       body: `We have successfully sent ${response.sent.length} out of ${total} invitation emails.`
      //     }, 5000);
      //     this.loadRequests();
      //   }
      // } else if (response.response.success && response.sent.length === 0 && response.unsent.length !== 0) {
      //   this.alertsService.alertDanger({
      //     title: 'Error sending invitations',
      //     body: `We weren't able to send a single invitation email. Please make sure the invitation email is valid and is not already in invitation list.<br><b>Failure emails:</b><br> ${response.unsent.join(',<br>')}`
      //   }, 7500);
        console.log('Success')
      } else {
        this.errorHelper.processedButFailed(response);
      }

    }, error => {

      // optional error handling
      // ...

      // then generic (if no handle before)
      this.errorHelper.handleGenericError(error);

    });
  }

  addToArray(input) {
    if (this.invitesArray.indexOf(input) >= 0) {
      console.log('Already exists');
    } else {
      this.invitesArray.push(input);
      sessionStorage.setItem('invitesArray', JSON.stringify(this.invitesArray));
    }
  }


}
