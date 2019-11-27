import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit {

  contact: any;
  mailList:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.contact = this.router.getCurrentNavigation().extras.state.contact;
      }
    });
  }

  ngOnInit() {
    this.http.get(`http://localhost:8080/mail/getMails?contactId=${this.contact.id}`).toPromise().then((response) => {
      this.mailList = response;
    });
  }

  formatDate(date){
    return moment(date).format('LLL');
  }

}
