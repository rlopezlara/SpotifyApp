import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SongsPageRoutingModule } from './songs-routing.module';

import { SongsPage } from './songs.page';

@NgModule({
  declarations: [SongsPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongsPageRoutingModule, 
  ]
})
export class SongsPageModule {}
