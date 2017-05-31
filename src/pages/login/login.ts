import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController } from 'ionic-angular';

import { Menu } from '../menu/menu';
import { Cadastro } from '../cadastro/cadastro';

import { Http } from '@angular/http';
import { Account } from '../model/account';
import 'rxjs/add/operator/map';

import { Singleton } from '../singleton';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  public mAccountNumber = '';
  public mPassword = '';

  public account: Account;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public http: Http,
    public singleton: Singleton) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
    this.menuCtrl.enable(false);
  }

  showMessageDialog(msg) {
    let dialog = this.alertCtrl.create({
      title: 'ATENÇÃO',
      subTitle: msg,
      buttons: ['OK']
    });
    dialog.present();
  }

  searchForAccount() {
    var mUrlSend = 'https://api.mlab.com/api/1/databases/primeiravez/collections/contasBancoMobile';
    var apiKey = 'apiKey=LY2LpWCk0i88f_5RkNtGA7EoGjA4JDMV';
    var accUrl = '?q={"number": \'' + this.mAccountNumber + '\'}&'

    var auxUrl = mUrlSend + accUrl + apiKey;

    this.http
      .get(auxUrl)
      .map(response => response.json())
      .subscribe(data => {
        if (data != undefined && data != '') {
          this.account = data[0];
          if (this.account == undefined && this.account.password != this.mPassword) {
            this.showMessageDialog("Senha incorreta!");
            this.account = new Account();
          } else {
            this.singleton.setUserLogged(this.account);
            this.navCtrl.setRoot(Menu);
          }
        } else {
          this.showMessageDialog("Esta conta não existe!");
        }
    });

  }

  goToMenu() {
    if (this.mAccountNumber != '' && this.mPassword != '') {
      this.searchForAccount();
    } else {
      this.showMessageDialog("Todos os campos são obrigatórios!");
    }
  }

  goToRegistration() {
    this.navCtrl.push(Cadastro);
  }

}
