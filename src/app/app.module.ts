import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { GoogleMaps } from '@ionic-native/google-maps';

import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Menu } from '../pages/menu/menu';
import { User } from '../pages/user/user';
import { Register } from '../pages/register/register';
import { Extract } from '../pages/extract/extract';

import { Singleton } from '../pages/singleton';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Menu,
    User,
    Register,
    Extract
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Menu,
    User,
    Register,
    Extract
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Singleton,
    LocationAccuracy,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
