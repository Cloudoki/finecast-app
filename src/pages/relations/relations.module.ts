import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelationsPage } from './relations';

@NgModule({
  declarations: [
    RelationsPage,
  ],
  imports: [
    IonicPageModule.forChild(RelationsPage),
  ],
  exports: [
    RelationsPage
  ]
})
export class RelationsModule {}
