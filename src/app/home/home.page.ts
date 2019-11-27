import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private http: HttpClient,
    private alertController: AlertController
  ) { }

  fileUpload(event) {    
    let formData = new FormData();
    formData.append('file', event.target.files[0]);
    this.http.post('http://localhost:8080/contact/uploadFile', formData).toPromise().then(async (response) => {

      const alert = await this.alertController.create({
        subHeader: 'Successful',
        message: 'File upload successfull.',
        buttons: ['OK']
      });

      await alert.present();
    }
    );
  }
}
