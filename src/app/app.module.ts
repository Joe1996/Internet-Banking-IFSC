import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Menu } from '../pages/menu/menu';
import { Usuario } from '../pages/usuario/usuario';
import { Cadastro } from '../pages/cadastro/cadastro';
import { Singleton } from '../pages/singleton';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Menu,
    Usuario,
    Cadastro
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
    Usuario,
    Cadastro
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Singleton,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
