import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, ToastController} from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

import { Menu } from '../menu/menu';
import { Register } from '../register/register';

import { Http, Headers } from '@angular/http';
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
    public singleton: Singleton,
    public locationAccuracy: LocationAccuracy,
    public toastCtrl: ToastController) {}

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

  showMessageToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  getLocation() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if(canRequest) {
        this.locationAccuracy
        .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
        .then(() => this.showMessageDialog("Localizado com sucesso!"),
          error => this.showMessageDialog("Error requesting location permissions" + error)
        );
      }
    });
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
          if (this.account == undefined || this.account.password != this.mPassword) {
            this.showMessageToast("Senha incorreta!");
            this.account = new Account();
          } else {
            this.singleton.setUserLogged(this.account);
            this.navCtrl.setRoot(Menu);
            this.updateLastLoginDate();
          }
        } else {
          this.showMessageToast("Conta inexiste!");
        }
    });

  }

  updateLastLoginDate() {
    //this.getLocation();

    var mUrl = 'https://api.mlab.com/api/1/databases/primeiravez/collections/contasBancoMobile?apiKey=LY2LpWCk0i88f_5RkNtGA7EoGjA4JDMV';

    var auxAccount = new Account();
    auxAccount._id = this.account._id;
    auxAccount.name = this.account.name;
    auxAccount.number = this.account.number;
    auxAccount.password = this.account.password;
    auxAccount.lastLogin = new Date().toLocaleString();
    auxAccount.balance = this.account.balance;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http
      .post(mUrl, JSON.stringify(auxAccount), {headers: headers})
      .map(response => response.json())
      .subscribe(data => {
        if (data != undefined) {
          console.log("MLAB - Data de login atualizada!");
        } else {
          console.log("MLAB - Data de login NÃO atualizada!");
        }
      });

  }

  goToMenu() {
    if (this.mAccountNumber != '' && this.mPassword != '') {
      this.searchForAccount();
    } else {
      this.showMessageToast("Todos os campos são obrigatórios!");
    }
  }

  goToRegistration() {
    this.navCtrl.push(Register);
  }

}
