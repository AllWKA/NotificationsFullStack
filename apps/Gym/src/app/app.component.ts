import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { FCM, NotificationData } from "@ionic-native/fcm/ngx";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.fcm.getToken().then(token => {
        // Your best bet is to here store the token on the user's profile on the
        // Firebase database, so that when you want to send notifications to this 
        // specific user you can do it from Cloud Functions.
        console.log("The token to use is: ",token);
      }).catch(error=>{
        //ocurrió un error al procesar el token
        console.error(error);
      });

      this.fcm.onTokenRefresh().subscribe(
        (token:string)=>console.log("Nuevo token",token),
        error=>console.error(error)
      );

      // this.fcm.onNotification().subscribe(data => {
      //   if (data.wasTapped) {
      //     //Notification was received on device tray and tapped by the user.
      //     console.log(JSON.stringify(data));
      //     this.navCtrl.setRoot('DetailPage', { profileId: data.profileId });
      //   } else {
      //     //Notification was received in foreground. Maybe the user needs to be notified.
      //     console.log(JSON.stringify(data));
      //     this.navCtrl.push('DetailPage', { profileId: data.profileId });
      //   }
      // });

      this.fcm.onNotification().subscribe(
        (data:NotificationData)=>{
          if(data.wasTapped){
            //ocurre cuando nuestra app está en segundo plano y hacemos tap en la notificación que se muestra en el dispositivo
            console.log("Received in background",JSON.stringify(data))
          }else{
            //ocurre cuando nuestra aplicación se encuentra en primer plano,
            //puedes mostrar una alerta o un modal con los datos del mensaje
            console.log("Received in foreground",JSON.stringify(data))
          }
         },error=>{
          console.error("Error in notification",error)
         }
);
    });
  }
}

