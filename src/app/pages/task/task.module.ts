import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';

import { TaskPage } from './task.page';
import { CardComponent } from './components/card/card.component';
import { AllComponent } from './pages/all/all.component';
import { DoneComponent } from './pages/done/done.component';
import { TodoComponent } from './pages/todo/todo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule
  ],
  declarations: [
    TaskPage,
    AllComponent,
    DoneComponent,
    TodoComponent,
    CardComponent,
  ]
})
export class TaskPageModule { }
