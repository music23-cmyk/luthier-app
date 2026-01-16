import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersFormPage } from './orders-form.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersFormPageRoutingModule {}
