import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { FCM, NotificationData } from '@ionic-native/fcm/ngx';

import { Statics } from "../pages/statics/statics";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public fcm: FCM) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      this.fcm.getToken()
        .then(token => { Statics.token = token; })
        .catch(error => { console.error(error); });

      this.fcm.onTokenRefresh().subscribe(
        (token: string) => alert(token),
        error => console.error(error)
      );

      this.fcm.onNotification().subscribe(
        (data: NotificationData) => {
          if (data.wasTapped) {
            console.log("Received in background", JSON.stringify(data))
          } else { console.log("Received in foreground", JSON.stringify(data)) }
        }, error => { console.error("Error in notification", error) });
    });
  }
}

