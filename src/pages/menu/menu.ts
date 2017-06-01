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

  constructor(public menuCtrl: MenuController, public singleton: Singleton) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
    this.menuCtrl.enable(true);
    this.userLogged = this.singleton.getUserLogged();
  }

}
