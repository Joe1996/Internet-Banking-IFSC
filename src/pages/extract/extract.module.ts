import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Extract } from './extract';

@NgModule({
  declarations: [
    Extract,
  ],
  imports: [
    IonicPageModule.forChild(Extract),
  ],
  exports: [
    Extract
  ]
})
export class ExtractModule {}
