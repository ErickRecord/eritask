import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskDatePage } from './task-date.page';

const routes: Routes = [
  {
    path: '',
    component: TaskDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskDatePageRoutingModule {}
