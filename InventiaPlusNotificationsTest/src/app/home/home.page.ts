import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { ApiInventiaService } from "../api-inventia.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  token = "none"
  response: any = "ninonino"
  constructor(private fcm: FCM, private apiInventia: ApiInventiaService) { }
  getToken() {
    this.fcm.getToken().then(token => {
      this.token = token;
    });

  }
  saveToken() {
    console.log("jiji equisde");

    this.response = this.apiInventia.updateToken(this.token);
  }
}
