import { Component } from '@angular/core';
import { NavController, App, ViewController } from 'ionic-angular';
import { PrincipalPage } from '../principal/principal';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public appCtrl: App) {

  }

    irAOtraPagina(){
      this.navCtrl.push(TabsPage);
      // this.viewCtrl.dismiss();
      // this.appCtrl.getRootNav().push(PrincipalPage);
    }
}
