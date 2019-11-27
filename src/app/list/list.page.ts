import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {
  }

  contactList: any;

  ngOnInit() {
    this.getAllContacts();
  }

  getAllContacts() {
    this.http.get('http://localhost:8080/contact/getAllContacts').toPromise().then((response) => {
      this.contactList = response;
    });
  }

  composeEmail() {
    let checkedContacts = this.contactList.filter(contact => contact.isChecked === true);

    let navigationExtras: NavigationExtras = {
      state: {
        contacts: checkedContacts
      }
    };
    this.router.navigate(['compose-email'], navigationExtras);
  }

  deleteContact() {
    let checkedContacts = this.contactList.filter(contact => contact.isChecked === true);
    let idList = checkedContacts.map(contact => contact.id);
    this.http.delete(`http://localhost:8080/contact/deleteContact?idList=${idList}`).toPromise().then((response) => {
      this.getAllContacts();
    });
  }

  async addContact() {
    const alert = await this.alertController.create({
      header: 'Add Contact',

      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'surname',
          placeholder: 'Surname'
        },
        {
          name: 'email',
          placeholder: 'Email'
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
              this.http.post('http://localhost:8080/contact/addContact', data).toPromise().then((response) => {
                this.getAllContacts();
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

  contactDetailsClicked() {
    let checkedContacts = this.contactList.filter(contact => contact.isChecked === true);

    let navigationExtras: NavigationExtras = {
      state: {
        contact:checkedContacts[0]
      }
    };
    this.router.navigate(['contact-details'], navigationExtras);
  }
}
