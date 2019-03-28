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

      console.log("tiburcio antes");

      this.fcm.getToken()
        .then(token => {
          Statics.token = token;
          console.log("token getToken tiburcio---> ", token);

        })
        .catch(error => { console.error(error); });

      console.log("tiburcio medio");

      this.fcm.onTokenRefresh().subscribe(
        (token: string) => {
          console.log("nuevo token tiburcio---> " + token);

          // this.rest.postUser(2, 1, "newDeviceToken", token).subscribe(
          //   res => { Statics.token = res + ""; }
          // );
        },
        error => console.error(error)
      );

      console.log("tiburcio después");
      //   this.fcm.onNotification().subscribe(
      //     (data: NotificationData) => {
      //       if (data.wasTapped) {
      //         console.log("Received in background", JSON.stringify(data))
      //       } else { console.log("Received in foreground", JSON.stringify(data)) }
      //     }, error => { console.error("Error in notification", error) });
    });
  }
}

