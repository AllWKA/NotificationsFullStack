import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { FCM, NotificationData } from '@ionic-native/fcm/ngx';

import { Statics } from "../pages/statics/statics";

import { RestProvider } from "../providers/rest/rest";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public fcm: FCM, public rest: RestProvider) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      this.fcm.getToken()
        .then(token => { Statics.token = token; })
        .catch(error => { console.error(error); });

      this.fcm.onTokenRefresh().subscribe(
        (token: string) => {
          console.log("ontokenRefresh: " + token);
          
          this.rest.postUser(2,1,"pruebita",token);
        },
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

