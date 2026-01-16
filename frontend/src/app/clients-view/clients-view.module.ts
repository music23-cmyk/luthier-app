import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsViewPageRoutingModule } from './clients-view-routing.module';

import { ClientsViewPage } from './clients-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsViewPageRoutingModule
  ],
  declarations: [ClientsViewPage]
})
export class ClientsViewPageModule {}
