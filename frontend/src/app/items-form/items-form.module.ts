import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemsFormPageRoutingModule } from './items-form-routing.module';

import { ItemsFormPage } from './items-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsFormPageRoutingModule
  ],
  declarations: [ItemsFormPage]
})
export class ItemsFormPageModule {}
