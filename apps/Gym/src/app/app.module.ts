import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PrincipalPage } from '../pages/principal/principal';
import { TabsPage } from '../pages/tabs/tabs';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { NewsServiceProvider } from '../providers/news-service/news-service';
// import { NoticiaPage } '../pages/noticia-page/noticia-page';

import {FCM} from '@ionic-native/fcm/ngx'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrincipalPage,
    TabsPage
    // NoticiaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrincipalPage,
    TabsPage
    // NoticiaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    NewsServiceProvider
  ]
})
export class AppModule {}
