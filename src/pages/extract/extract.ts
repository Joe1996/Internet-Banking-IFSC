import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

import { Http} from '@angular/http';
import { AccountExtract } from '../model/accountExtract';

@IonicPage()
@Component({
  selector: 'page-extract',
  templateUrl: 'extract.html',
})
export class Extract {

  public extracts: AccountExtract;

  public mUrl = 'https://api.mlab.com/api/1/databases/primeiravez/collections/transacoes?apiKey=LY2LpWCk0i88f_5RkNtGA7EoGjA4JDMV';

  constructor(public http: Http) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Extract');
    this.getExtracts();
  }

  getExtracts() {
    this.http
      .get(this.mUrl)
      .map(response => response.json())
      .subscribe(data => {
        console.log(data);
        this.extracts = data;
      });
  }

}
