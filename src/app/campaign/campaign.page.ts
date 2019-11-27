import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.page.html',
  styleUrls: ['./campaign.page.scss'],
})
export class CampaignPage implements OnInit {

  constructor(
    private http: HttpClient,
    private alertController: AlertController
  ) { }

  campaignList: any;

  ngOnInit() {
    this.getAllCampaigns();
  }

  getAllCampaigns() {
    this.http.get('http://localhost:8080/campaign/getAllCampaigns').toPromise().then((response) => {
      this.campaignList = response;
    });
  }

  async addCampaign() {
    const alert = await this.alertController.create({
      header: 'Add Campaign',

      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name) {
              this.http.post('http://localhost:8080/campaign/addCampaign', data.name).toPromise().then((response) => {
                this.getAllCampaigns();
                return true;
              });
            }
            else {
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  cancelCampaign() {
    let checkedCampaigns = this.campaignList.filter(contact => contact.isChecked === true);
    let idList = checkedCampaigns.map(contact => contact.id);

    this.http.post('http://localhost:8080/campaign/cancelCampaign', idList).toPromise().then((response) => {
      this.getAllCampaigns();
    });

  }
}
