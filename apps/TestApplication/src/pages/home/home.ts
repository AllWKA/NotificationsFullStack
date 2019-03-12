import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FCM, NotificationData } from '@ionic-native/fcm/ngx';

import { Statics } from "../../pages/statics/statics";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token = "-->" + Statics.token;
  constructor(public navCtrl: NavController, public fcm: FCM) {

  }

  getToken() {
    this.token = "getting token";
    console.log("gola");

    this.fcm.onTokenRefresh()
    .subscribe(
      (token: string) => alert(token),
      error => console.error(error)
    );
  }

}
