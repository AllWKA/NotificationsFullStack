import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Statics } from "../../pages/statics/statics";
import { RestProvider } from "../../providers/rest/rest";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token = "-->" + Statics.token;
  user = "";
  pwd = "";
  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public rest: RestProvider) {

  }

  log(){
    
    
    console.log("ha vorvido");
  }

}
