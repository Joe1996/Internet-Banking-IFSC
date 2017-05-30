import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Cadastro } from './cadastro';

@NgModule({
  declarations: [
    Cadastro,
  ],
  imports: [
    IonicPageModule.forChild(Cadastro),
  ],
  exports: [
    Cadastro
  ]
})
export class CadastroModule {}
