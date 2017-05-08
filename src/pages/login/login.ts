import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Menu } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
    this.menuCtrl.enable(false);
  }

  goToMenu() {
    this.navCtrl.setRoot(Menu);
  }

}
