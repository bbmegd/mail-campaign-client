import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController, IonTextarea, IonSelect } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.page.html',
  styleUrls: ['./compose-email.page.scss'],
})
export class ComposeEmailPage implements OnInit {

  @ViewChild("message", { static: false }) message: IonTextarea;
  @ViewChild("campaign", { static: false }) campaign: IonSelect;

  contacts: [];
  toContactsLabel = "To: ";
  mailForm: FormGroup;
  campaignList:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.contacts = this.router.getCurrentNavigation().extras.state.contacts;

        this.contacts.forEach(contact => {
          this.toContactsLabel += (contact['name'] + " " + contact['surname'] + ", ");
        });
        this.toContactsLabel = this.toContactsLabel.slice(0, this.toContactsLabel.length - 2);
      }
    });
  }

  validation_messages = {
    message:
      [{ type: "required", message: "Please enter message." }],
    campaign:
      [{ type: "required", message: "Please enter campaign." }]
  }

  ngOnInit() {
    this.createForm();
    this.getAllActiveCampaigns();
  }

  getAllActiveCampaigns() {
    this.http.get('http://localhost:8080/campaign/getAllActiveCampaigns').toPromise().then((response) => {
      this.campaignList = response;
    });
  }

  createForm() {
    this.mailForm = new FormGroup({
      message: new FormControl("", Validators.required),
      campaign: new FormControl("", Validators.required)
    })
  }

  sendEmail() {
    let email = {
      contacts: this.contacts,
      message: this.message.value,
      campaign:this.campaignList.filter(item=>item.id===this.campaign.value)[0]
    }
    this.http.post('http://localhost:8080/contact/sendEmail', email)
      .toPromise()
      .then(async (response) => {

        const alert = await this.alertController.create({
          header: 'Alert',
          subHeader: 'Successful',
          message: 'Mail is sent.',
          buttons: ['OK']
        });

        await alert.present();
      }
      );
  }

}
