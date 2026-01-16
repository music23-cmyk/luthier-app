import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsViewPage } from './clients-view.page';

const routes: Routes = [
  {
    path: '',
    component: ClientsViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsViewPageRoutingModule {}
