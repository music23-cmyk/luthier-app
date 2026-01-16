import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersFormPageRoutingModule } from './orders-form-routing.module';

import { OrdersFormPage } from './orders-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersFormPageRoutingModule
  ],
  declarations: [OrdersFormPage]
})
export class OrdersFormPageModule {}
