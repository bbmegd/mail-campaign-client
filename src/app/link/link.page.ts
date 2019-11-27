import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.page.html',
  styleUrls: ['./link.page.scss'],
})
export class LinkPage implements OnInit {

  @Input() uuid;
  endTime: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }


  ngOnInit() {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');
    this.http.post('http://localhost:8080/mail/linkClicked', this.uuid).toPromise().then((response) => {
    });
  }

}
