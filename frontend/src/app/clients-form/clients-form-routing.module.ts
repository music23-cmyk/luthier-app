import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsFormPage } from './clients-form.page';

const routes: Routes = [
  {
    path: '',
    component: ClientsFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsFormPageRoutingModule {}
