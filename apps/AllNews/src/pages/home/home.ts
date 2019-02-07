import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NewsPage } from "../news/news";
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = "";
  pwd = "";
  error= "noerror";

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private rest: RestProvider) {

  }

  log() {

    //TODO: verificar
    console.log("Entro Normal");


    if (this.checkForm() == true) {
      this.rest.getUser(this.user, this.pwd).subscribe(
        user => {
          this.changePage(0);
        },
        err => this.error = err


      );
      // this.changePage(0);


    }

  }

  logFacebook() {

    console.log("Entro con FaceBook");
  }

  logGoogle() {

    console.log("Entro con Google");
  }

  changePage(url: Number) {

    console.log("Cambio Página: ", url);
    switch (url) {
      case 0:
        this.navCtrl.push(NewsPage);
        break;
      case 1:
        console.log("entré en create");
        break;
    }

  }

  singUp() {
    //TODO: news or create New
    //this.changePage(1);
  }

  checkForm() {

    if (this.user.length != 0 && this.pwd.length != 0) {

      return true;
    }

    let alert = this.alertCtrl.create({

      title: 'Empty field',
      subTitle: 'User or Password is empty.'
    });

    alert.present();

    return false;
  }

}
