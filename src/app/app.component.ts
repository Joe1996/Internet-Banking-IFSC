import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Singleton } from '../pages/singleton';

import { Login } from '../pages/login/login';
import { Menu } from '../pages/menu/menu';
import { User } from '../pages/user/user';
import { Register } from '../pages/register/register';
import { Extract } from '../pages/extract/extract';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = Login;

  loginPage:any = Login;
  menuPage:any = Menu;
  userPage:any = User;
  registerPage:any = Register;
  extractPage:any = Extract;

  pages: Array<{title: string, component: any}>

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public singleton: Singleton) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  navigate(page) {
    if (page == this.loginPage) {
      this.singleton.setUserLogged('');
    }
    this.nav.setRoot(page);
  }

}
