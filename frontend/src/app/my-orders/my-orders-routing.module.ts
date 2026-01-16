import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyOrdersPage } from './my-orders.page';
import { OrderViewPage } from '../order-view/order-view.page';
import { OrdersFormPage } from '../orders-form/orders-form.page';

const routes: Routes = [
  {path: '', component: MyOrdersPage  },
  { path: 'my-orders', component: MyOrdersPage },
  { path: 'orders-form', component: OrdersFormPage },
  { path: 'order-view/:id', component: OrderViewPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOrdersPageRoutingModule {}
