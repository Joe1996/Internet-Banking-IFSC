import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, MenuController } from 'ionic-angular';

import { Singleton } from '../singleton';
import { Account } from '../model/account';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

declare var google;

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class Menu {
  @ViewChild('map') mapElement: ElementRef;
  map:any;

  userLogged = new Account();

  constructor(
    public menuCtrl: MenuController,
    public singleton: Singleton) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
    this.menuCtrl.enable(true);
    this.userLogged = this.singleton.getUserLogged();
    this.loadMap();
  }

  loadMap() {
    let latLng: LatLng = new LatLng(43.0741904, -89.3809802);

    let position: CameraPosition = {
      target: latLng,
      zoom: 18
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, position);

    //map.moveCamera(position);
  }

}
