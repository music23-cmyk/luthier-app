import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },

  // Orders
  { path: 'my-orders', loadChildren: () => import('./my-orders/my-orders.module').then(m => m.MyOrdersPageModule) },
  { path: 'orders-form', loadChildren: () => import('./orders-form/orders-form.module').then(m => m.OrdersFormPageModule) },
  { path: 'orders-form/:id', loadChildren: () => import('./orders-form/orders-form.module').then(m => m.OrdersFormPageModule) },
  { path: 'order-view/:id', loadChildren: () => import('./order-view/order-view.module').then(m => m.OrderViewPageModule) },

  // Clients
  { path: 'clients-list', loadChildren: () => import('./clients-list/clients-list.module').then(m => m.ClientsListPageModule) },
  { path: 'clients-form', loadChildren: () => import('./clients-form/clients-form.module').then(m => m.ClientsFormPageModule) },
  { path: 'clients-form/:id', loadChildren: () => import('./clients-form/clients-form.module').then(m => m.ClientsFormPageModule) },

  // Items
  { path: 'items-list', loadChildren: () => import('./items-list/items-list.module').then(m => m.ItemsListPageModule) },
  { path: 'items-form', loadChildren: () => import('./items-form/items-form.module').then(m => m.ItemsFormPageModule) },
  { path: 'items-form/:id', loadChildren: () => import('./items-form/items-form.module').then(m => m.ItemsFormPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}


