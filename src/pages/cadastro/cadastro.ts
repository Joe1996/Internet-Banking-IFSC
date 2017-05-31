import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';
import { Account } from '../model/account';
import { AccountBank } from '../model/accountBank';
import { Menu } from '../menu/menu';
import 'rxjs/add/operator/map';

import { Singleton } from '../singleton';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class Cadastro {

  public mAccountNumber = '';
  public mAccountPassword = '';
  public mPassword = '';
  public mConfirmPassword = '';

  private mUrlBank = 'https://api.mlab.com/api/1/databases/primeiravez/collections/contasBancoTeste';
  private mUrlBankMobile = 'https://api.mlab.com/api/1/databases/primeiravez/collections/contasBancoMobile';
  private mApiKey = 'apiKey=LY2LpWCk0i88f_5RkNtGA7EoGjA4JDMV';

  public mAccountBank: AccountBank;
  public mAccountMobile: Account;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: Http,
    public singleton: Singleton) {}

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
    this.mAccountMobile.number = this.mAccountNumber;
    this.mAccountMobile.password = this.mPassword;
    this.mAccountMobile.name = this.mAccountBank.nome;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var auxUrl = this.mUrlBankMobile + "?" + this.mApiKey;

    this.http
      .post(auxUrl, JSON.stringify(this.mAccountMobile), {headers: headers})
      .map(response => response.json())
      .subscribe(data => {
        this.mAccountMobile = data[0];
        this.navCtrl.setRoot(Menu);
        this.singleton.setUserLogged(this.mAccountMobile);
      });

  }

  searchForAccount() {
    var accNumber = '?q={"numero": \'' + this.mAccountNumber + '\' }&';
    var auxUrl = this.mUrlBank + accNumber + this.mApiKey;

    this.http
      .get(auxUrl)
      .map(response => response.json())
      .subscribe(data => {
        if (data != null && data != '') {
          this.mAccountBank = data[0];
          if(this.mAccountBank.senha == this.mAccountPassword) {
            this.searchForAccountMobile();
          } else {
            this.showMessageDialog("Senha da conta incorreta!");
            this.clearFields(false);
          }
        } else {
          this.showMessageDialog("Conta inexistente!");
          this.clearFields(false);
        }
      });
  }

  searchForAccountMobile() {
    var accNumber = '?q={"number": \'' + this.mAccountNumber + '\' }&';
    var auxUrl = this.mUrlBankMobile + accNumber + this.mApiKey;

    this.http
      .get(auxUrl)
      .map(response => response.json())
      .subscribe(data => {
        if (data != null && data != '') {
          this.showMessageDialog("Conta já cadastrada!");
          this.clearFields(false);
        } else {
          this.sendData();
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
      this.mAccountPassword = '';
    }
  }

  register() {
    if (this.mAccountNumber != '' && this.mPassword != '' && this.mConfirmPassword != '') {
      if (this.mPassword == this.mConfirmPassword) {
        this.searchForAccount();
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
