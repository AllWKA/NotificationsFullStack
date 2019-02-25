import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html'
})
export class PrincipalPage {

  activeMenu: string;

  constructor(public menu: MenuController) {
    this.menu1Active();
  }
  menu1Active() {
    this.activeMenu = 'menu1';
    this.menu.enable(true, 'menu1');
    this.menu.enable(false, 'menu2');
  }
  menu2Active() {
    this.activeMenu = 'menu2';
    this.menu.enable(false, 'menu1');
    this.menu.enable(true, 'menu2');
  }

}


