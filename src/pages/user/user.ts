import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Account } from '../model/account';
import { Singleton } from '../singleton'

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class User {

  public userLogged = new Account();

  public mOldPassword = '';
  public mPassword = '';
  public mConfirmPassword = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public singleton: Singleton,
    public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Usuario');
    this.userLogged = this.singleton.getUserLogged();
  }

  showMessageDialog(msg) {
    let dialog = this.alertCtrl.create({
      title: 'ATENÇÃO',
      subTitle: msg,
      buttons: ['OK']
    });
    dialog.present();
  }

  clearFields(oldPass) {
    if (oldPass) {
      this.mOldPassword = '';
    }
    this.mPassword = '';
    this.mConfirmPassword = '';
  }

  changePassword() {
    this.userLogged.password = this.mPassword;

    var mUrl = 'https://api.mlab.com/api/1/databases/primeiravez/collections/contasBancoMobile?apiKey=LY2LpWCk0i88f_5RkNtGA7EoGjA4JDMV';

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http
      .post(mUrl, JSON.stringify(this.userLogged), {headers: headers})
      .map(response => response.json())
      .subscribe(data => {
        var response: Account;
        response = data;
        if (response.password == this.mPassword) {
          this.showMessageDialog("Senha alterada com sucesso!");
        } else {
          this.showMessageDialog("Não foi possível alterar a senha!");
        }
        this.clearFields(true);
      });
  }

  validate() {
    if (this.mOldPassword == this.userLogged.password) {
      if (this.mPassword == this.mConfirmPassword) {
        this.changePassword();
      } else {
        this.showMessageDialog("Senha atual não confere!");
        this.clearFields(false);
      }
    } else {
      this.showMessageDialog("Senha atual não confere!");
      this.clearFields(true);
    }
  }

}
