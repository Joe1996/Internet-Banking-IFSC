import { Component } from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';

import { Singleton } from '../singleton';
import { Account } from '../model/account';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class Menu {

  userLogged = new Account();

  items = [
  '13 15:33 -R$110,34 PAGAMENTO ÁGUA',
  '17 15:33 -R$80,34 PAGAMENTO TELEFONE',
  '21 15:33 -R$650,34 COMPRA NO CARTÃO',
  '28 15:33 -R$80,00 VILLAGES',
  '30 15:33 +R$3500,00 MEU PAGAMENTO',
  ];

  constructor(public menuCtrl: MenuController, public singleton: Singleton) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
    this.menuCtrl.enable(true);
    this.userLogged = this.singleton.getUserLogged();
  }

  itemSelected(item) {

  }

}
