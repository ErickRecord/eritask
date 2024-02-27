import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskPage } from './task.page';
import { AllComponent } from './pages/all/all.component';
import { TodoComponent } from './pages/todo/todo.component';
import { DoneComponent } from './pages/done/done.component';

const routes: Routes = [
  {
    path: '',
    component: TaskPage,
    children: [
      {
        path: '',
        component: AllComponent
      },
      {
        path: 'done',
        component: DoneComponent
      },
      {
        path: 'todo',
        component: TodoComponent
      },
    ]
  },
  {
    path: 'add-task',
    loadChildren: () => import('./pages/add-task/add-task.module').then(m => m.AddTaskPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskPageRoutingModule { }
