import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Mensagem } from '../model/mensagem';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class Usuario {

  public msgs: Mensagem;

  private mUrl = 'https://api.mlab.com/api/1/databases/primeiravez/collections/mensagem?apiKey=LY2LpWCk0i88f_5RkNtGA7EoGjA4JDMV';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Usuario');
  }

  enviarMensagem() {
    var msg = new Mensagem();
    msg.titulo = 'Nova mensagem';
    msg.texto = 'Mensagem do celular';

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http
    .post(this.mUrl, JSON.stringify(msg), {headers: headers})
    .map(response => response.json())
    .subscribe(data => {console.log(data)});
  }

  buscarMensagem() {
    this.http
    .get(this.mUrl)
    .map(response => response.json())
    .subscribe(data => {
      this.msgs = data;
      });
  }

}
