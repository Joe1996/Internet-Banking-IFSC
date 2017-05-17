import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { Login } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class Menu {
  items = [
  '13 15:33 -R$110,34 PAGAMENTO ÁGUA',
  '17 15:33 -R$80,34 PAGAMENTO TELEFONE',
  '21 15:33 -R$650,34 COMPRA NO CARTÃO',
  '28 15:33 -R$80,00 VILLAGES',
  '30 15:33 +R$3500,00 MEU PAGAMENTO',
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
    this.menuCtrl.enable(true);
  }

  exit() {
      this.navCtrl.push(Login);
      this.navCtrl.setRoot(Login);
  }

  itemSelected(item) {

  }
  
}
