import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';
import { Account } from '../model/account';
import { Menu } from '../menu/menu';
import 'rxjs/add/operator/map';

import { Singleton } from '../singleton';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class Cadastro {

  mAccountNumber = '';
  mPassword = '';
  mConfirmPassword = '';

  private mUrlSearch = 'https://api.mlab.com/api/1/databases/primeiravez/collections/contasBancoTeste';
  private mUrlSend = 'https://api.mlab.com/api/1/databases/primeiravez/collections/contasBancoMobile?apiKey=LY2LpWCk0i88f_5RkNtGA7EoGjA4JDMV';
  private mApiKey = 'apiKey=LY2LpWCk0i88f_5RkNtGA7EoGjA4JDMV';

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http, public singleton: Singleton) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Cadastro');
  }

  showMessageDialog(msg) {
    let confirm = this.alertCtrl.create({
      title: 'ATENÇÃO',
      subTitle: msg,
      buttons: ['OK']
    });
    confirm.present();
  }

  sendData() {
    var acc = new Account();
    acc.number = this.mAccountNumber;
    acc.password = this.mPassword;
    acc.name = 'Nome de teste!';

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http
    .post(this.mUrlSend, JSON.stringify(acc), {headers: headers})
    .map(response => response.json())
    .subscribe(data => {
      console.log(data);
      this.navCtrl.setRoot(Menu);
      this.singleton.setUserLogged(acc);
    });

  }

  checkIfAccountExists() {
    var accNumber = '?q={"numeroConta": \'' + this.mAccountNumber + '\' }&';
    var auxUrl = this.mUrlSearch + accNumber + this.mApiKey;

    this.http
    .get(auxUrl)
    .map(response => response.json())
    .subscribe(data => {
        if (data != null && data != '') {
          this.sendData();
        } else {
          this.showMessageDialog("Você precisa de uma conta ativa!");
          this.clearFields(false);
        }
      });
  }

  clearFields(onlyPassword) {
    if (onlyPassword) {
      this.mPassword = '';
      this.mConfirmPassword = '';
    } else {
      this.mAccountNumber = '';
      this.mPassword = '';
      this.mConfirmPassword = '';
    }
  }

  register() {
    if (this.mAccountNumber != '' && this.mPassword != '' && this.mConfirmPassword != '') {
      if (this.mPassword == this.mConfirmPassword) {
        this.checkIfAccountExists();
      } else {
        this.showMessageDialog('As senhas não conferem!');
        this.clearFields(true);
      }
    } else {
      this.showMessageDialog('Todos os campos são obrigatórios!');
      this.clearFields(false);
    }
  }

}
